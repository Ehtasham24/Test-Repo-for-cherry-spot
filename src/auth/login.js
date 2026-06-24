const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev-secret';

// CONFLICT TEST: this branch changes login differently from staging/TC-002
// staging adds refreshToken; this branch adds remember-me and audit log
function login(username, password, rememberMe = false) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
  const expiry = rememberMe ? '30d' : '8h';
  const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: expiry });
  console.log(`[AUDIT] login attempt: ${username}`);
  return { token, rememberMe };
}

module.exports = { login };
