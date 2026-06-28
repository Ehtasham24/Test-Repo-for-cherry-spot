const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev-secret';

function login(username, password) {
  // TODO: validate against database
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1d' });
  return { token };
}

module.exports = { login };
