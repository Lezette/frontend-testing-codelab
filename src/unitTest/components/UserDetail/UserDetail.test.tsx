import { render, screen, waitFor } from '@testing-library/react';
import UserDetail from '.';
import { vi, Mock } from 'vitest';

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

test('renders loading initially', () => {
  (global.fetch as Mock).mockResolvedValueOnce({
    json: () => Promise.resolve({ id: 1, name: 'John Doe' }),
  });

  render(<UserDetail userId={1} />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('displays user data after fetch is complete', async () => {
  (global.fetch as Mock).mockResolvedValueOnce({
    json: () => Promise.resolve({ id: 1, name: 'John Doe' }),
  });

  render(<UserDetail userId={1} />);
  await waitFor(() => expect(screen.getByText(/John Doe/i)).toBeInTheDocument());
});

test('fetches new user data when userId changes', async () => {
  // Initial render with userId=1
  (global.fetch as Mock).mockResolvedValueOnce({
    json: () => Promise.resolve({ id: 1, name: 'John Doe' }),
  });

  const { rerender } = render(<UserDetail userId={1} />);
  await waitFor(() => expect(screen.getByText(/John Doe/i)).toBeInTheDocument());

  // Update userId to 2
  (global.fetch as Mock).mockResolvedValueOnce({
    json: () => Promise.resolve({ id: 2, name: 'Jane Doe' }),
  });

  rerender(<UserDetail userId={2} />);
  await waitFor(() => expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument());
});

test('handles missing user data gracefully', async () => {
  (global.fetch as Mock).mockResolvedValueOnce({
    json: () => Promise.resolve(null),
  });

  render(<UserDetail userId={999} />);
  await waitFor(() => expect(screen.getByText(/No user found/i)).toBeInTheDocument());
});
