import { render, screen, waitFor } from '@testing-library/react';
import UserDetail from '.';
import { vi, Mock } from 'vitest';

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

/*

Test to consider
--------------------
// shows loading initially
// displays user info after fetch is complete
// update user data when the userId changes
// handles empty result

*/

test('shows loading initially',  () => {
  (global.fetch as Mock).mockResolvedValueOnce({
    json: () => Promise.resolve({ id: 1, name: 'Cat Burns' })
  })

  render(<UserDetail userId={1} />)
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
})

 
test('displays user info after fetch is complete', async () => { 
  (global.fetch as Mock).mockResolvedValueOnce({
    json: () => Promise.resolve({ id: 1, name: 'Cat Burns' })
  })
  
  render(<UserDetail userId={1} />)
  await waitFor(() => expect(screen.getByText(/Name: Cat Burns/i)).toBeInTheDocument())
})

test('update user data when the userId changes', async () => { 
  (global.fetch as Mock).mockResolvedValueOnce({
    json: () => Promise.resolve({ id: 1, name: 'Cat Burns' })
  });

  const { rerender } = render(<UserDetail userId={1} />)
  await waitFor(() => expect(screen.getByText(/Name: Cat Burns/i)).toBeInTheDocument());

  (global.fetch as Mock).mockResolvedValueOnce({
    json: () => Promise.resolve({ id: 2, name: 'Joy Odungoke' })
  });

  rerender(<UserDetail userId={2} />)
  await waitFor(() => expect(screen.getByText(/Name: Joy Odungoke/i)).toBeInTheDocument());
})

test('handles empty result', async () => { 
  (global.fetch as Mock).mockResolvedValueOnce({
    json: () => Promise.resolve(null)
  })

  render(<UserDetail userId={1} />)
  await waitFor(() => expect(screen.getByText(/No user found/i)).toBeInTheDocument())
 })