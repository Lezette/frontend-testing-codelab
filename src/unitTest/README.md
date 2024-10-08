# Unit testing

In this module you'll learn the basics of unit testing, you'll start by setting up a react application with Vite, writing a simple test then we'll explore some advance concepts in unit test. We'll be using [Vitest](https://vitest.dev/) which is a vite-native framework. Vitest is the a test runner for vite projects, and it's similar to Jest.

## Setting up a React Project with Vite Using Yarn

- **Step 1:** In your terminal, create a new project with Vite and React using Yarn:

`yarn create vite unit-testing-setup --template react-ts`

- **Step 2:** Navigate to your project directory and install the inital dependencies by running `yarn install`

- **Step 3:** Installing the required dependencies run:

`yarn add @testing-library/react @testing-library/jest-dom vitest @vitejs/plugin-react`

- @testing-library/react: React Testing Library for testing React components.
- @testing-library/jest-dom: Custom Jest matchers for more readable assertions.
- vitest: A Vite-native testing framework (similar to Jest).
- @vitejs/plugin-react: Vite plugin for React fast refresh and JSX support.
- @types/react-dom

- **Step 4:** Configure `vitest` in `vite.config.ts`
  Open `vite.config.ts` file and add the test configurations

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
```

- **Step 5:** Create the test setup file

Navigate to the src folder and create a `setupTest.ts` file (this could be any filename but it should match the name added to setupFiles in the `vite.config.ts`) and add the following line to include the jest-dom matchers:

`import '@testing-library/jest-dom';`

That'll be all for now, Let's create a simple component and write a test for it

First create a components folder and create a folder inside of that and call Hello, inside of that create and index file. The structure should look like this `src/components/Hello/index.tsx`. Inside the `index.tsx` file add this

```js
type HelloProps = {
  name: string,
};

function Hello({ name }: HelloProps) {
  return <h1>Hello, {name}!</h1>;
}

export default Hello;
```

This is a basic component with a prop, let's test this to ensure that it renders "Hello, World" if we pass "World" as a props to the component

create a test file in the component `src/components/Hello/Hello.test.tsx` and add the following:

```js
import { render, screen } from "@testing-library/react";
import Hello from ".";

test("renders the correct greeting text", () => {
  render(<Hello name="World" />);
  const greetingElement = screen.getByText("Hello, World!");
  expect(greetingElement).toBeInTheDocument();
});
```

### Code explationation

- **test** The test keyword is used to define a single test case.

- **expect** The expect is used to assert that a value meets certain conditions. It's used for assertion.

- **render** The Render method is used here to render a react component (Hello) into the virtual DOM for testing purposes. You use it to stimulate what happens when the component is rendered in the actual application.

- **screen** The Screen is a utility object that provides a simplified and global way to access the queries returned by render. Instead of destructuring the return value of render, screen provides a global query object that directly queries the DOM.
