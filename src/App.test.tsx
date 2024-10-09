import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test("renders initial count as 0", () => {
  render(<App />);
  expect(screen.getByText(/count is 0/i)).toBeInTheDocument();
});

test("increment the count on button click", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: /count is 0/i });

  fireEvent.click(button);
  expect(screen.getByText(/count is 1/i)).toBeInTheDocument();
});

test("should update the document title on button click", () => {
  render(<App />);
  expect(document.title).toBe("Count: 0");
  const button = screen.getByRole("button", { name: /count is 0/i });
  fireEvent.click(button);
  expect(document.title).toBe("Count: 1");
});