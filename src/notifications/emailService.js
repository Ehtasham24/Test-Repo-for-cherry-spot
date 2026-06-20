async function sendEmail(to, subject, body) {
  // TODO: integrate SMTP / SendGrid
  console.log(`[EMAIL] To: ${to} | Subject: ${subject}`);
  return { queued: true, to, subject };
}

async function sendTaskAssignedEmail(assignee, task) {
  return sendEmail(
    assignee,
    `New task assigned: ${task.title}`,
    `You have been assigned task #${task.id}: ${task.title}`
  );
}

module.exports = { sendEmail, sendTaskAssignedEmail };
