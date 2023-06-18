# SmartJSCodeActions

SmartJSCodeActions is a powerful Visual Studio Code extension that provides code actions to transform JavaScript and TypeScript objects to maps and vice versa.

## Features

- Transform Object to Map: Convert JavaScript and TypeScript objects to `Map` data structure.

- Transform Map to Object: Convert `Map` data structure to JavaScript and TypeScript objects.

## Usage

1. Select the JavaScript or TypeScript code containing an object you want to transform.

2. Use the code action menu (lightbulb icon) or the keyboard shortcut to trigger the available code actions.

3. Choose the desired code action from the list: "Transform Object to Map" or "Transform Map to Object".

4. The code action will automatically transform the selected code and update it with the transformed version.

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
