import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn();

const mockTodos = [
  { id: 1, title: 'Test Todo 1', completed: false },
  { id: 2, title: 'Test Todo 2', completed: true },
  { id: 3, title: 'Test Todo 3', completed: false },
];

beforeEach(() => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => mockTodos,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('displays stats correctly based on todos array', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todos to load
  await waitFor(() => {
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
  });

  // Should show 2 items left (incomplete todos)
  expect(screen.getByText('2 items left')).toBeInTheDocument();
  
  // Should show 1 completed
  expect(screen.getByText('1 completed')).toBeInTheDocument();
});

test('displays empty state message when no todos', async () => {
  const testQueryClient = createTestQueryClient();
  
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for empty state message
  await waitFor(() => {
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });
});

test('deletes a todo when delete button is clicked', async () => {
  const testQueryClient = createTestQueryClient();
  const user = userEvent.setup();

  // Mock initial fetch
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos,
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todos to load
  await waitFor(() => {
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
  });

  // Mock delete response and refetch
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1 }),
  });
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockTodos.filter(t => t.id !== 1),
  });

  // Click delete button for first todo using accessible label
  const deleteButtons = screen.getAllByRole('button', { name: /delete todo/i });
  await user.click(deleteButtons[0]);

  // Verify DELETE API call was made
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/todos/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

test('handles API errors gracefully', async () => {
  const testQueryClient = createTestQueryClient();
  
  // Mock fetch to reject
  global.fetch.mockRejectedValueOnce(new Error('Network error'));

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Should show error message
  await waitFor(() => {
    expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
  });
});
