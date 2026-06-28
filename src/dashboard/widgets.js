function getSummaryWidget(tasks) {
  return {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };
}

function getAssigneeWidget(tasks) {
  const map = {};
  for (const task of tasks) {
    map[task.assignee] = (map[task.assignee] || 0) + 1;
  }
  return map;
}

module.exports = { getSummaryWidget, getAssigneeWidget };
