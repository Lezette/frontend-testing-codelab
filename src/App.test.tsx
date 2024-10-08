import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders initial count', () => { 
  render(<App />)
  expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
})

test('increment the count on button click', () => {
  render(<App />)
  const button = screen.getByRole('button', { name: /increment/i })
  fireEvent.click(button);
  expect(screen.getByText(/Count: 1/i)).toBeInTheDocument();
})

test('should update the document title on increment', () => { 
  render(<App />)
  expect(document.title).toBe('Count: 0');
   const button = screen.getByRole('button', { name: /increment/i })
  fireEvent.click(button);
  expect(document.title).toBe('Count: 1');
 })