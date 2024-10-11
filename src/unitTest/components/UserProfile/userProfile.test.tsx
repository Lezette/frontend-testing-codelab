import { render, screen, waitFor } from "@testing-library/react";
import UserProfile from ".";
import { vi, Mock } from 'vitest';

beforeEach(() => {
  global.fetch = vi.fn(() => Promise.resolve({
    json: () => Promise.resolve({ id: 1, name: 'Leanne Graham' }),
  })
  ) as Mock;
});

afterEach(() => {
  vi.clearAllMocks();
});

test('displays loading initially', () => {
  render(<UserProfile />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('displays user name after data is loaded', async () => {
  render(<UserProfile />);
  await waitFor(() => expect(screen.getByText(/Leanne Graham/i)).toBeInTheDocument());
});

test('handles missing user gracefully', async () => {
  (global.fetch as Mock).mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(null),
    })
  );

  render(<UserProfile />);
  await waitFor(() => expect(screen.getByText(/No user found/i)).toBeInTheDocument());
});