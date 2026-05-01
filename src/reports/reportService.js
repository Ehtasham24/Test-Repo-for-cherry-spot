function weeklyReport(tasks) { return tasks.filter(t => { const d = new Date(t.createdAt); const now = new Date(); return (now - d) < 7*86400000; }); } module.exports = { weeklyReport };
