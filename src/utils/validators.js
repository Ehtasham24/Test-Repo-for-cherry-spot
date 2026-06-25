function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return password && password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
}

function isValidUsername(username) {
  return username && /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

function isValidAmount(amount) {
  return typeof amount === 'number' && amount > 0 && Number.isFinite(amount);
}

function sanitizeString(str) {
  return String(str).trim().replace(/[<>]/g, '');
}

module.exports = { isValidEmail, isValidPassword, isValidUsername, isValidAmount, sanitizeString };
