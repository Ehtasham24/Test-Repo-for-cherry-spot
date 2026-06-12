function getSummaryWidget(tasks) {
  return {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date()).length,
  };
}

function getAssigneeWidget(tasks) {
  const map = {};
  for (const task of tasks) {
    if (!map[task.assignee]) map[task.assignee] = { total: 0, done: 0 };
    map[task.assignee].total++;
    if (task.status === 'done') map[task.assignee].done++;
  }
  return map;
}

function getPriorityWidget(tasks) {
  return {
    high: tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low: tasks.filter(t => t.priority === 'low').length,
  };
}

module.exports = { getSummaryWidget, getAssigneeWidget, getPriorityWidget };
