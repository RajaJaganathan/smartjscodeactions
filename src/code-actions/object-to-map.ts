const parser = require("@babel/parser");
import traverse, { NodePath } from "@babel/traverse";
import generator from "@babel/generator";
import {
  AssignmentExpression,
  VariableDeclaration,
  ObjectExpression,
} from "@babel/types";

export function transformObjectToMap(text: string) {
  const ast = parser.parse(text, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(ast, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ObjectExpression(path: NodePath<ObjectExpression>) {
      const properties = path.node.properties;
      const mapEntries = properties.map((property: any) => {
        const key = generator(property.key).code;
        const value = generator(property.value).code;
        if (property.computed) {
          return `[${key}, ${value}]`;
        }
        return `["${key}", ${value}]`;
      });

      const mapNode = `new Map([${mapEntries.join(", ")}])`;
      path.replaceWithSourceString(mapNode);
    },
  });

  const transformedCode = generator(ast).code;
  return transformedCode;
}

export function isObjectDeclaration(selectedText: string) {
  let isDeclaration = false;

  try {
    const ast = parser.parse(selectedText, {
      sourceType: "module",
      plugins: ["jsx", "tsx", "typescript"],
    });

    traverse(ast, {
      
      // eslint-disable-next-line @typescript-eslint/naming-convention
      VariableDeclaration(path: NodePath<VariableDeclaration>) {
        if (path.node.declarations.length === 1) {
          const declarator = path.node.declarations[0];
          if (declarator.init && declarator.init.type === "ObjectExpression") {
            isDeclaration = true;
            path.stop();
          }
        }
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      AssignmentExpression(path: NodePath<AssignmentExpression>) {
        if (
          path.node.left.type === "Identifier" &&
          path.node.right.type === "ObjectExpression"
        ) {
          isDeclaration = true;
          path.stop();
        }
      },
    });
  } catch (error) {
    console.error("Error parsing code:", error);
  }

  return isDeclaration;
}
