# Unit testing

In this module you'll learn the basics of unit testing, you'll start by setting up a react application with Vite, writing a simple test then we'll explore some advanced concepts in unit tests. We'll be using [Vitest](https://vitest.dev/) which is a vite-native framework. Vitest is a test runner for Vite projects, and it's similar to Jest.

## Setting up a React Project with Vite Using Yarn

- **Step 1:** In your terminal, create a new project with Vite and React using Yarn:

`yarn create vite unit-testing-setup --template react-ts`

- **Step 2:** Navigate to your project directory and install the initial dependencies by running `yarn install`

- **Step 3:** Installing the required dependencies run:

`yarn add @testing-library/react @testing-library/jest-dom vitest @vitejs/plugin-react @testing-library/dom jsdom`

- @testing-library/react: React Testing Library for testing React components.
- @testing-library/jest-dom: Custom Jest matches for more readable assertions.
- vitest: A Vite-native testing framework (similar to Jest).
- @vitejs/plugin-react: Vite plugin for React fast refresh and JSX support.
- @testing-library/dom: Ensures that all DOM-related utilities, like screen, are properly available in your test environment.
- jsdom: Acts as a lightweight, headless browser environment for testing components that interact with the DOM. Vitest requires it to simulate the browser environment and properly test React components.

- **Step 4:** Configure `vitest` in `vite.config.ts`
  Open `vite.config.ts` file and add the test configurations

```js
import { defineConfig } from "vitest/config"; // Use vitest's defineConfig instead of vite's
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable Vitest's globals like `test` and `expect`
    environment: "jsdom", // Use JSDOM for React component testing
    setupFiles: "./src/setupTests.ts", // Setup file for configurations
  },
});
```

- **Step 5:** Create the test setup file

Navigate to the src folder and create a `setupTest.ts` file (this could be any filename but it should match the name added to setupFiles in the `vite.config.ts`) and add the following line to include the jest-dom matches:

`import '@testing-library/jest-dom';`

- **Step 6:** Update TypeScript Config (tsconfig.json)

Add Vitest types to your tsconfig.json to recognize globals like test and expect, By adding vitest/globals, TypeScript will recognize the test, describe, and expect etc functions.

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"],
    "jsx": "react",
    "module": "ESNext",
    "target": "ESNext",
    ...
  }
}
```

That'll be all for now, Let's create a simple component and write a test for it

First, create a components folder and create a folder inside of that and call Hello, inside of that create an index file. The structure should look like this `src/components/Hello/index.tsx`. Inside the `index.tsx` file add this

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

Next run `yarn vitest` OR `npx vitest` to run your test

### Code explanation

- **test** The test keyword is used to define a single test case.

- **expect** The expect is used to assert that a value meets certain conditions. It's used for assertion.

- **render** The Render method is used here to render a react component (Hello) into the virtual DOM for testing purposes. You use it to stimulate what happens when the component is rendered in the actual application.

- **screen** The Screen is a utility object that provides a simplified and global way to access the queries returned by render. Instead of destructuring the return value of render, the screen provides a global query object that directly queries the DOM.

## Testing with stateful components and side effects

When testing, useEffect can complicate things because it triggers automatically on mount and update, making it difficult to control.

Now let's look at testing a component with internal state and a simple useEffect, and then add an API call to see how it changes the testing approach.

Create a Counter component `src/component/Counter/index.tsx`, Alternatively, you can update the App.tsx file to this

```tsx
import { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div className="card">
      <button onClick={() => setCount(count + 1)}>count is {count}</button>
    </div>
  );
};

export default App;
```

To test this component, we'll focus on three thing

- The document initially displays 'count is 0'
- On click of the button the content gets updated to 'count is 1'
- On click of the button the document.title gets updated to 'Count: 1'

So let's create a test for this. Create a test file `src/component/Counter/counter.test.tsx`

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from ".";

test("renders initial count as 0", () => {
  render(<Counter />);
  expect(screen.getByText(/count is 0/i)).toBeInTheDocument();
});

test("increment the count on button click", () => {
  render(<Counter />);

  const button = screen.getByRole("button", { name: /count is 0/i });

  fireEvent.click(button);
  expect(screen.getByText(/count is 1/i)).toBeInTheDocument();
});

test("should update the document title on button click", () => {
  render(<Counter />);
  expect(document.title).toBe("Count: 0");
  const button = screen.getByRole("button", { name: /count is 0/i });
  fireEvent.click(button);
  expect(document.title).toBe("Count: 1");
});
```

### Stateful Component with useEffect and API Calls

Next, let's see how to test on a component that uses useEffect to make API calls, For simplicity sake we'll use the JSONPlaceholder API.

Create a UserProfile component in and add a basic user profile view

```tsx
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
};

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1>User Profile</h1>
      {user ? <p>{user.name}</p> : <p>No user found</p>}
    </div>
  );
};

export default UserProfile;
```

For this component here are some possible test consideration

- Mock the fetch function (to prevent the test from making actual fetch request)
- Ensure that the component displays loading initially
- Enusure that the component displays user name after data is loaded
- Ensure that the component account for a missing user

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import UserProfile from ".";
import { vi, Mock } from "vitest";

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ id: 1, name: "Leanne Graham" }),
    })
  ) as Mock;
});

afterEach(() => {
  vi.clearAllMocks();
});

test("displays loading initially", () => {
  render(<UserProfile />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test("displays user name after data is loaded", async () => {
  render(<UserProfile />);
  await waitFor(() =>
    expect(screen.getByText(/Leanne Graham/i)).toBeInTheDocument()
  );
});

test("handles missing user gracefully", async () => {
  (global.fetch as Mock).mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(null),
    })
  );

  render(<UserProfile />);
  await waitFor(() =>
    expect(screen.getByText(/No user found/i)).toBeInTheDocument()
  );
});
```

The code above might throw a typescript error for the global.fetch like something like "Cannot find name 'global'", This is because the global object (global in Node.js) is not recognized in TypeScript by default. We need to properly type it so TypeScript knows what global.fetch refers to. To fix this you'll need to install `types/node`. So run `yarn add types/node`

That should fix the error. So let's go through the code to understand what was done.

#### `beforeEach` and `afterEach`

These are lifecycle hooks provided by the test runner (vitest in this case). They allow you to run specific code before and after each test case. This is useful for setting up and tearing down configurations, mocks, or data that you need for your tests. Some other lifecycle hooks are `beforeAll` and `afterAll`.

In the test `beforeEach` mocks the `global.fetch` function before each test so every test starts with a fresh mock version of fetch.
`afterEach`clears the mock data after each test to ensure one test doesn’t affect the next for example preventing leftover mock states.

#### `global.fetch`

The `fetch` function is a browser-native function used for making HTTP requests. To get a refrence to the fetch function we're using `global.fetch` which is similar to the browser `window`.

In the test, we're overridding the `global.fetch` to mock the `fetch` implementation, so that when a request is made in the React component, it returns a fake data instead of making a network request.

#### `vi.fn()`

`vi.fn()` is a mock function that allows you stimulate a a function’s behavior and track its calls, parameters, and return values.

In the test, `vi.fn(() => Promise.resolve(...))` creates a mock version of fetch that returns a resolved promise with fake JSON data.
This way, when your component calls `fetch` to get user data, it doesn’t actually hit a real server.

#### `mockImplementationOnce`

`mockImplementationOnce` sets up a one-time implementation for a mock function. After it’s called once, it reverts to the default behavior of `vi.fn()`.

In the test, `(global.fetch as Mock).mockImplementationOnce()` is telling `fetch` to return `null` for a specific test in this case a missing user.

## Testing `useEffect` with dependencies

Before we continue here let's do a quick recap on `useEffect`

- useEffect is a React hook that allows you to run side effects in function components.
- It runs after the component renders and re-runs if its dependencies change.
- The dependency array tells React when to re-run the effect. If any of the values in the dependency changes, the effect is triggered again.

The goal here is to understand how to write effective test for `useEffect` when its dependency array changes.

So let's create a component that fetches data based on a `userId` prop and when `userId` changes, `useEffect` re-runs and fetches the new user’s data

```tsx
import React, { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
};

type UserDetailProps = {
  userId: number;
};

const UserDetail: React.FC<UserDetailProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch user data
    const fetchUser = async () => {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const data = await response.json();
      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user found</p>;

  return (
    <div>
      <h2>User Detail</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
    </div>
  );
};

export default UserDetail;
```
