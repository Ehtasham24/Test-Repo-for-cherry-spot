const payments = [];

function processPayment(taskId, amount, method) {
  if (!taskId || !amount || amount <= 0) {
    throw new Error('Invalid payment details');
  }
  const payment = {
    id: Date.now(),
    taskId,
    amount,
    method: method || 'card',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  payments.push(payment);
  return payment;
}

function getPayments(taskId) {
  return taskId ? payments.filter(p => p.taskId === taskId) : payments;
}

module.exports = { processPayment, getPayments };
