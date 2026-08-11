const { expect } = require('@playwright/test');

class TodoPage {
  constructor(page) {
    this.page = page;
    this.titleInput = page.getByPlaceholder('What needs to be done?');
    this.addButton = page.getByRole('button', { name: /add/i });
    this.emptyStateMessage = page.getByText(/no todos yet/i);
    this.errorMessage = page.getByText(/error loading todos/i);
    this.statsIncomplete = page.getByText(/items left/);
    this.statsCompleted = page.getByText(/completed/);
  }

  async goto() {
    await this.page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  }

  async clearAllTodos() {
    // Keep clicking the first delete button until there are none left
    let deleteButton = this.page.getByRole('button', { name: /delete todo/i }).first();
    while (await deleteButton.count() > 0) {
      await deleteButton.click();
      await this.page.waitForTimeout(100);
    }
  }

  async addTodo(title) {
    await this.titleInput.fill(title);
    await this.addButton.click();
    await this.page.getByText(title).waitFor({ state: 'visible' });
  }

  async toggleTodo(title) {
    const todoItem = this.page.getByText(title).locator('..');
    const checkbox = todoItem.getByRole('checkbox');
    await checkbox.click();
  }

  async deleteTodo(title) {
    const todoItem = this.page.getByText(title).locator('..');
    const deleteButton = todoItem.getByRole('button', { name: /delete todo/i });
    await deleteButton.click();
    await this.page.getByText(title).waitFor({ state: 'detached' });
  }

  async expectTodoVisible(title) {
    await expect(this.page.getByText(title)).toBeVisible();
  }

  async expectTodoCompleted(title) {
    const todoText = this.page.getByText(title);
    await expect(todoText).toHaveCSS('text-decoration', /line-through/);
  }

  async expectEmptyState() {
    await expect(this.emptyStateMessage).toBeVisible();
  }

  async expectStats(incomplete, completed) {
    const incompleteText = incomplete + ' items left';
    const completedText = completed + ' completed';
    await expect(this.statsIncomplete).toContainText(incompleteText);
    await expect(this.statsCompleted).toContainText(completedText);
  }
}

module.exports = { TodoPage };
