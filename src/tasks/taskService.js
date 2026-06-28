const tasks = [];

function createTask(title, description, assignee) {
  const task = {
    id: Date.now(),
    title,
    description,
    assignee,
    status: 'todo',
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function getTasks(filter = {}) {
  return tasks.filter(t => {
    if (filter.status && t.status !== filter.status) return false;
    if (filter.assignee && t.assignee !== filter.assignee) return false;
    return true;
  });
}

function updateTask(id, updates) {
  const task = tasks.find(t => t.id === id);
  if (!task) throw new Error(`Task ${id} not found`);
  Object.assign(task, updates);
  return task;
}

module.exports = { createTask, getTasks, updateTask };
