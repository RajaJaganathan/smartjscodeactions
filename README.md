# SmartJSCodeActions

SmartJSCodeActions is a Visual Studio Code extension that provides code actions for transforming JavaScript and TypeScript code. It currently supports the following transformations:

1. **Object to Map**: Convert JavaScript objects to Map data structures.
2. **Map to Object**: Convert Map data structures to JavaScript objects.

## Features

- Object to Map transformation: Convert JavaScript objects to Map data structures.
- Map to Object transformation: Convert Map data structures to JavaScript objects.
- Automatic detection of object literals and Map declarations in your code.
- Support for multi-line and single-line code snippets.
- Preserve comments and formatting during the transformation.
- Easy-to-use and intuitive code actions within the Visual Studio Code editor.

## Requirements

- Visual Studio Code version 1.60.0 or higher.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Search for "SmartJSCodeActions" in the extension marketplace.
4. Click **Install** to install the extension.
5. Once installed, the extension will be activated automatically.

## Usage

1. Open a JavaScript or TypeScript file in Visual Studio Code.
2. Select the code snippet or expression that you want to transform.
3. Right-click on the selected code or press `Ctrl+.` (`Cmd+.` on macOS) to open the code actions menu.
4. Look for the available code actions starting with "SmartJSCodeActions".
5. Choose the appropriate code action based on the transformation you want to perform.
6. The selected code will be transformed accordingly, preserving comments and formatting.
7. Review and verify the transformed code.
8. Enjoy the improved productivity and code quality provided by SmartJSCodeActions!



## Examples

### Transform Object to Map

```javascript
const person = {
  name: "John Doe",
  age: 30,
  email: "johndoe@example.com",
  address: {
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001"
  },
  hobbies: ["reading", "playing guitar", "traveling"],
  isActive: true
};

// Select the above code and trigger the "Transform Object to Map" code action.
```

### Transform Map to Object

```javascript
const person = new Map([
  ["name", "John Doe"],
  ["age", 30],
  ["email", "johndoe@example.com"],
  [
    "address",
    new Map([
      ["street", "123 Main Street"],
      ["city", "New York"],
      ["state", "NY"],
      ["zip", "10001"],
    ]),
  ],
  ["hobbies", ["reading", "playing guitar", "traveling"]],
  ["isActive", true],
]);

// Select the above code and trigger the "Transform Object to Map" code action.

```

## Roadmap

SmartJSCodeActions is actively being developed, and additional features and transformations are planned for future releases. The following enhancements are coming soon:

- Support for more code transformations and refactorings.
- Improved handling of complex objects and nested structures.
- Fine-tuning of the transformation algorithms for increased accuracy.
- User-defined settings and customization options.
- Integration with other popular JavaScript and TypeScript extensions.

Stay tuned for updates and new releases!

## Contributing

Contributions to SmartJSCodeActions are welcome! If you encounter any issues, have ideas for new features, or want to contribute code improvements, please check out the [GitHub repository](https://github.com/RajaJaganathan/smartjscodeactions) and open an issue or submit a pull request.

## License

This extension is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the [LICENSE](LICENSE) file for more details.

---

Thank you for using SmartJSCodeActions! We hope it enhances your coding experience and saves you time and effort in transforming your JavaScript and TypeScript code. If you have any feedback or suggestions, please don't hesitate to reach out. Happy coding!
