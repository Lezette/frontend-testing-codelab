import { render, screen } from '@testing-library/react';
import Hello from ".";

test('renders the correct greeting text', () => {
  render(<Hello name="World" />);
  const greetingElement = screen.getByText('Hello, World!');
  expect(greetingElement).toBeInTheDocument();
});