const tasks = [];
let nextId = 1;

// CONFLICT COMMIT 1: adds nextId + status enum — conflicts with staging/TC-003
// (TC-003 adds priority field; this version omits priority, uses different IDs approach)
const STATUS = Object.freeze({ TODO: 'todo', IN_PROGRESS: 'in-progress', DONE: 'done' });

function createTask(title, description, assignee) {
  if (!title) throw new Error('Title is required');
  const task = {
    id: nextId++,
    title,
    description,
    assignee,
    status: STATUS.TODO,
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

module.exports = { createTask, getTasks, updateTask, STATUS };
