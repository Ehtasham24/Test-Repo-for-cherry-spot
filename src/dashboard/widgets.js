// CONFLICT COMMIT 2: changes widgets differently from staging/TC-004
// (TC-004 adds overdue + priority widgets; this adds a stacked-bar widget instead)
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

function getStackedBarWidget(tasks) {
  const bars = ['todo', 'in-progress', 'done'].map(status => ({
    label: status,
    count: tasks.filter(t => t.status === status).length,
    pct: tasks.length ? Math.round(tasks.filter(t => t.status === status).length / tasks.length * 100) : 0,
  }));
  return { type: 'stacked-bar', bars };
}

module.exports = { getSummaryWidget, getAssigneeWidget, getStackedBarWidget };
