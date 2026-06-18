const notifications = [];

function sendNotification(userId, type, message) {
  const note = {
    id: Date.now(),
    userId,
    type,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  };
  notifications.push(note);
  return note;
}

function getUnread(userId) {
  return notifications.filter(n => n.userId === userId && !n.read);
}

function markRead(id) {
  const note = notifications.find(n => n.id === id);
  if (note) note.read = true;
  return note;
}

module.exports = { sendNotification, getUnread, markRead };
