// CONFLICT TEST: this branch changes widgets differently from staging/TC-004
// staging adds overdue + priority widgets; this branch adds a timeline widget
function getSummaryWidget(tasks) {
  return {
    total: tasks.length,
    byStatus: tasks.reduce((acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {}),
  };
}

function getAssigneeWidget(tasks) {
  const map = {};
  for (const task of tasks) {
    map[task.assignee] = (map[task.assignee] || 0) + 1;
  }
  return map;
}

function getTimelineWidget(tasks, days = 7) {
  const cutoff = new Date(Date.now() - days * 86400000).toISOString();
  return tasks.filter(t => t.createdAt > cutoff);
}

module.exports = { getSummaryWidget, getAssigneeWidget, getTimelineWidget };
