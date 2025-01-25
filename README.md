# SingleTab

**SingleTab** is a lightweight React library to detect and handle duplicate tabs in web applications.

---

## Features

- Detect duplicate tabs in React applications.
- Show customizable warnings when duplicate tabs are detected.
- Lightweight and easy to integrate.

---

## Installation

Install the package using NPM:

```bash
npm install single-tab
```

---

## Basic Usage

Here's a quick example to get started with **SingleTab** in your React application:

```tsx
import { useSingleTab, SingleTabModal } from "single-tab";

const App = () => {
  const { isDuplicate, showWarning, dismissWarning, message } =
    useSingleTab("my-app");

  return (
    <>
      {showWarning && (
        <SingleTabModal
          isOpen={showWarning}
          content={message}
          onClose={dismissWarning}
        />
      )}
      <div>
        <h1>Welcome to My App</h1>
        <p>Enjoy using the app with duplicate tab detection enabled!</p>
      </div>
    </>
  );
};

export default App;
```

---

## API Reference

### `useSingleTab(appId: string)`

This is the core hook used to detect and handle duplicate tabs.

- **Parameters**:

  - `appId: string`: A unique identifier for your app to avoid conflicts when using shared domains.

- **Returns**:
  - **`isDuplicate: boolean`**: Indicates whether the current tab is a duplicate.
  - **`showWarning: boolean`**: Controls the visibility of the warning modal.
  - **`dismissWarning: () => void`**: Function to manually dismiss the modal.
  - **`message: string`**: Default warning message (can be overridden).

---

### `<SingleTabModal />`

The default modal component for displaying duplicate tab warnings.

- **Props**:
  - **`isOpen: boolean`**: Determines whether the modal is visible.
  - **`content: React.ReactNode`**: Customizable content to display in the modal.
  - **`onClose?: () => void`**: Optional callback function to close the modal.

---

## License

**SingleTab** is licensed under the MIT License:

```
MIT License

Copyright (c) 2025 Abiodun Sabitu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request on [GitHub](https://github.com/Abiodun-Sabitu/single-tab).

---

## Author

Developed by **Abiodun Sabitu**.
