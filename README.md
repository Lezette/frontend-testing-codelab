# Frontend Testing in React + Typescript using Vitest (WIP)

This repo is a starter kit for anyone who is looking to learn FE testing. If you're a trying to understand FE testing and don't know where to start from then this tutorial is for you.

## What is software testing?

Well, just like the name applies, software testing is ensuring that a software program works efficently by accessing different features of the program and checking that it satisfies the expected outcome.

There are different kinds of tests that can be run, In this tutorial, I'll focus on testing the Frontend part of an application.

## Prerequisites

To follow along this tutorial you need to have knowledge of:

- React
- Typescript
- API calls
- General Frontend concepts

## Testing Concepts

Before diving into frontend testing tools let's look at some basic testing concepts these are helpful to understand testing.

Each type of test serves a different purpose and is used at different stages of development.

- Unit Testing: Testing individual functions or components in isolation.
- Integration Testing: Testing how multiple components work together.
- End-to-End (E2E) Testing: Testing the entire application flow from the user’s perspective.

### Unit Testing

Unit tests focus on testing individual pieces of functionality in isolation, like a function, a component, or a method. The goal of unit testing is to ensure that each unit of code works as expected on its own. Unit tests are done during the development process of the application.

An example of using unit test when to write a unit test is to test that a React button component renders properly or a component renders the desired format after an api call. Some common tools used for unit testing are [Jest](https://jestjs.io/), [Mocha](https://mochajs.org/), [Jasmine](https://jasmine.github.io/).

### Integration Testing

Integration tests checks how multiple units work together. This involves testing the interaction between components, modules, or systems. The goal of integration testing is to test that multiple parts of your application work together correctly. Integration tests are used after individual components are built to verify combined functionality.

An example of integration test could be testing a form component that interacts with multiple child components (e.g., an input field and a submit button). A common tools used for integration test is [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

### End-to-End (E2E) Testing

End-to-End (E2E) tests simulates a real user interacting with the application to test full workflows and features. The goal of E2E testing is to check that the entire flow of your application works as intended from start to finish. E2E Tests are usually run at the end of the development cycle to confirm everything works as expected by replicating a real-world scenario.

An example of E2E test could be testing the login process of an application, including entering credentials, form submission, and verifying redirection. Some tools used for E2E testing are [Cypress](https://www.cypress.io/), [Playwright](https://playwright.dev/), [Puppeteer](https://pptr.dev/)

#

When you're learning tests, a common phrase you'll hear is **Test Driven Deelopment (TDD)**

## What is Test Driven Development (TDD)?

TDD is a development approach wehre you write tests before writing the actual software, It involves writing a test that fails, then writing the minimum code required for the test to pass, then refactoring both the test and the code, then moving one to another test scenario. The goal of TDD is to encourage writing only the necessary code and ensure that each piece of functionality is tested from the beginning. TDD can be done during any Unit or Integration process (it only makes sense right?)

In this tutorial, we'll start with Unit test and explore different scenerios, earn how to write simple unit tests for React components (of course) then move up to understanding how to mock functions, API calls, and simulate events. Then, we'll move on to Integration Testing, test common scenarios like user input, state changes, and rendering conditions. And then we'll go on to explore E2E testing, we'll setup a simple application to pratice E2E and ensure we **cover _accessibility_ considerations**

## Tutorial Structure

To follow along this tutorial, you can start from the top of the list and each examples in the different sections and work your way down.

- [Unit tests](src/unitTest/README.md)

# Some Recommended Resources

- [How to know what to test](https://kentcdodds.com/blog/how-to-know-what-to-test)
