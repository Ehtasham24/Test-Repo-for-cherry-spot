function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return password && password.length >= 8;
}

function isValidUsername(username) {
  return username && /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

module.exports = { isValidEmail, isValidPassword, isValidUsername };
