const tasks = [];
let nextId = 1;

function createTask(title, description, assignee, priority = 'medium') {
  if (!title) throw new Error('Title is required');
  const task = {
    id: nextId++,
    title,
    description,
    assignee,
    priority,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function getTasks(filter = {}) {
  return tasks.filter(t => {
    if (filter.status && t.status !== filter.status) return false;
    if (filter.assignee && t.assignee !== filter.assignee) return false;
    if (filter.priority && t.priority !== filter.priority) return false;
    return true;
  });
}

function getTaskById(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) throw new Error(`Task ${id} not found`);
  return task;
}

function updateTask(id, updates) {
  const task = getTaskById(id);
  Object.assign(task, updates, { updatedAt: new Date().toISOString() });
  return task;
}

function deleteTask(id) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) throw new Error(`Task ${id} not found`);
  tasks.splice(idx, 1);
  return { deleted: id };
}

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
