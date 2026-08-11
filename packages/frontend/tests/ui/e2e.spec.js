const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./pages/TodoPage');

test.describe('TODO App - Critical User Journeys', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.clearAllTodos();
  });

  test('should create a new todo', async () => {
    await todoPage.expectEmptyState();
    await todoPage.addTodo('Buy groceries');
    await todoPage.expectTodoVisible('Buy groceries');
    await todoPage.expectStats(1, 0);
  });

  test('should toggle todo completion status', async () => {
    await todoPage.addTodo('Write tests');
    await todoPage.expectStats(1, 0);
    await todoPage.toggleTodo('Write tests');
    await todoPage.expectTodoCompleted('Write tests');
    await todoPage.expectStats(0, 1);
    await todoPage.toggleTodo('Write tests');
    await todoPage.expectStats(1, 0);
  });

  test('should delete a todo', async () => {
    await todoPage.addTodo('First task');
    await todoPage.addTodo('Second task');
    await todoPage.expectStats(2, 0);
    await todoPage.deleteTodo('First task');
    await todoPage.expectTodoVisible('Second task');
    await todoPage.expectStats(1, 0);
    await todoPage.deleteTodo('Second task');
    await todoPage.expectEmptyState();
    await todoPage.expectStats(0, 0);
  });

  test('should display empty state when no todos exist', async () => {
    await todoPage.expectEmptyState();
    await todoPage.expectStats(0, 0);
    await todoPage.addTodo('Temporary task');
    await expect(todoPage.emptyStateMessage).not.toBeVisible();
    await todoPage.deleteTodo('Temporary task');
    await todoPage.expectEmptyState();
  });

  test('should calculate stats correctly with multiple todos', async () => {
    await todoPage.addTodo('Task 1');
    await todoPage.addTodo('Task 2');
    await todoPage.addTodo('Task 3');
    await todoPage.expectStats(3, 0);
    await todoPage.toggleTodo('Task 1');
    await todoPage.expectStats(2, 1);
    await todoPage.toggleTodo('Task 3');
    await todoPage.expectStats(1, 2);
    await todoPage.toggleTodo('Task 2');
    await todoPage.expectStats(0, 3);
  });
});
