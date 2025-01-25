# SingleTab

**SingleTab** is a lightweight React library to detect and handle duplicate tabs in web applications.

---

## Features

- Detect duplicate tabs in React applications.
- Prevent dismissing duplicate warnings (non-closable by default).
- Show customizable warnings when duplicate tabs are detected.
- Highly customizable and adaptable to any UI framework or design system.
- Lightweight and easy to integrate.
- Supports React frameworks, including Next.js, with SSR considerations.

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
"use client"; // Required for SSR-supported frameworks like Next.js

import { useSingleTab, SingleTabModal } from "single-tab";
import { Outlet } from "react-router-dom";

// Example 1: Within Nested Routes
export const usageWithinNestedRoutes = () => {
  const { isDuplicate, showWarning, message } = useSingleTab("my-app");

  return (
    <div>
      {isDuplicate && (
        <SingleTabModal isOpen={showWarning} content={<p>{message}</p>} />
      )}
      <Outlet />
    </div>
  );
};
```

```tsx
"use client"; // Required for SSR-supported frameworks like Next.js

import { useSingleTab, SingleTabModal } from "single-tab";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Example 2: Globally Across the Application
export const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  const { isDuplicate, showWarning, message } = useSingleTab("my-app");

  return (
    <>
      {isDuplicate && (
        <SingleTabModal isOpen={showWarning} content={<p>{message}</p>} />
      )}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
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
  - **`message: string`**: Default warning message (can be overridden).

**Note**: For Next.js or other SSR environments, ensure the component using `useSingleTab` is client-side rendered. Add `"use client"` at the top of your file.

---

### `<SingleTabModal />`

The default modal component for displaying duplicate tab warnings. It is designed to be non-closable by default.

- **Props**:
  - **`isOpen: boolean`**: Determines whether the modal is visible.
  - **`content: React.ReactNode`**: Customizable content to display in the modal.
  - **`style?: React.CSSProperties`** (optional): Custom styles for the outer modal container.

**Note**: The modal is optional, and you can use your own UI component or framework for showing warnings.

---

## SSR and Next.js Considerations

When using **SingleTab** in frameworks like Next.js:

1. **Add \*\***`"use client"`\*\*: Ensure components using `useSingleTab` are client-side rendered by including `"use client"` at the top of the file.

2. **Console Warning**: If the library is used in an SSR context, a warning will appear:

   ```
   [SingleTab] This library is designed for browser environments only.
   ```

   This is expected behavior to ensure SSR does not interfere with the hook's functionality.

---

## Testing

All components and hooks are fully tested. Use the following command to run the test suite:

```bash
npm test
```

The tests cover:

- Duplicate tab detection using `BroadcastChannel` and `sessionStorage`.
- Custom modal behavior and rendering.
- Handling edge cases for duplicate tab warnings.

---

## Extensibility

- **Custom Modals**: You can replace `SingleTabModal` with your own modal implementation or UI framework (e.g., Material-UI, Ant Design).
- **Custom Behavior**: Leverage the `useSingleTab` hook to create fully customized duplicate tab handling logic for your app.

```tsx
"use client"; // Required for SSR-supported frameworks like Next.js

import { useSingleTab } from "single-tab";

export const usageWithoutSingleTabModal = () => {
  const { isDuplicate, showWarning, message } = useSingleTab("my-app");

  return (
    <div>
      {isDuplicate && showWarning && (
        // Replace with a custom UI modal of your choice
        <CustomModalComponent content={message} />
      )}
      <h1>Welcome to My Custom App</h1>
    </div>
  );
};
```

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
