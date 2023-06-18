const parser = require("@babel/parser");
import traverse from "@babel/traverse";
import generator from "@babel/generator";
import { ArrayExpression, ObjectExpression } from "@babel/types";

export function transformMapToObject(text: string) {
  const ast = parser.parse(text, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(ast, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    NewExpression(path: any) {
      if (
        path.node.callee.type === "Identifier" &&
        path.node.callee.name === "Map"
      ) {
        let objectNode = "";
        const properties = path.get("arguments")[0]?.get("elements");
        if (properties) {
          const objectProperties = properties.map((property: any) => {
            let key, value;

            const keyNode = property.get("elements")[0]?.node;
            if (keyNode) {
              if (keyNode.type === "StringLiteral") {
                key = keyNode.value;
              } else if (keyNode.type === "Identifier") {
                key = keyNode.name;
              }
            }

            const valueNode = property.get("elements")[1]?.node;
            if (valueNode) {
              if (valueNode.type === "StringLiteral") {
                value = `"${valueNode.value}"`;
              } else if (valueNode.type === "ObjectExpression") {
                value = transformObjectExpression(valueNode);
              } else if (valueNode.type === "ArrayExpression") {
                value = transformArrayExpression(valueNode);
              } else if (valueNode.type === "NewExpression") {
                value = transformNewExpression(valueNode);
              } else {
                value = valueNode.value;
              }
            }

            return `${key}: ${value}`;
          });
          objectNode = `{ ${objectProperties.join(", ")} }`;
          path.replaceWithSourceString(objectNode);
        }
      }
    },
  });

  const transformedCode = generator(ast).code;
  return transformedCode;
}

export function isMapDeclaration(selectedText: string) {
  let isDeclaration = false;

  try {
    const ast = parser.parse(selectedText, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    traverse(ast, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      VariableDeclaration(path) {
        const declaration = path.node.declarations[0];
        if (declaration && _isMapDeclaration(declaration)) {
          isDeclaration = true;
          path.stop();
        }
      },
    });
  } catch (error) {
    // Handle parsing error, if any
    console.error("Error parsing code:", error);
  }

  return isDeclaration;
}

function _isMapDeclaration(declaration: any): boolean {
  return (
    declaration &&
    declaration.init &&
    declaration.init.type === "NewExpression" &&
    declaration.init.callee &&
    declaration.init.callee.type === "Identifier" &&
    declaration.init.callee.name === "Map"
  );
}

function transformObjectExpression(objectExpression: ObjectExpression): string {
  const properties = objectExpression.properties.map((property: any) => {
    let key, value;

    if (property.type === "ObjectProperty") {
      const keyNode = property.key;
      if (keyNode.type === "StringLiteral") {
        key = keyNode.value;
      } else if (keyNode.type === "Identifier") {
        key = keyNode.name;
      }

      const valueNode = property.value;
      if (valueNode.type === "StringLiteral") {
        value = `"${valueNode.value}"`;
      } else if (valueNode.type === "ObjectExpression") {
        value = transformObjectExpression(valueNode);
      } else if (valueNode.type === "ArrayExpression") {
        value = transformArrayExpression(valueNode);
      } else if (valueNode.type === "NewExpression") {
        value = transformNewExpression(valueNode);
      } else {
        value = valueNode?.value;
      }
    }

    return `${key}: ${value}`;
  });

  return `{ ${properties.join(", ")} }`;
}

function transformArrayExpression(arrayExpression: ArrayExpression): string {
  const elements = arrayExpression.elements.map((element: any) => {
    if (element.type === "StringLiteral") {
      return `"${element.value}"`;
    } else if (element.type === "ObjectExpression") {
      return transformObjectExpression(element);
    } else if (element.type === "ArrayExpression") {
      return transformArrayExpression(element);
    } else if (element.type === "NewExpression") {
      return transformNewExpression(element);
    } else {
      return element.value;
    }
  });

  return `[${elements.join(", ")}]`;
}

function transformNewExpression(newExpression: any): string {
  const { callee, arguments: args } = newExpression;

  let transformedCode = `new ${callee.name}(`;

  if (args && args.length > 0) {
    const argValues = args.map((arg: any) => {
      if (arg.type === "StringLiteral") {
        return `"${arg.value}"`;
      } else if (arg.type === "ObjectExpression") {
        return transformObjectExpression(arg);
      } else if (arg.type === "ArrayExpression") {
        return transformArrayExpression(arg);
      } else if (arg.type === "NewExpression") {
        return transformNewExpression(arg);
      } else {
        return arg.value;
      }
    });

    transformedCode += argValues.join(", ");
  }

  transformedCode += ")";

  return transformedCode;
}
