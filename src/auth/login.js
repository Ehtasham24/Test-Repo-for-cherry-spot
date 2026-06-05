const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.JWT_SECRET || 'dev-secret';

async function login(username, password) {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
  // TODO: fetch user from database and compare hash
  const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '8h' });
  const refreshToken = jwt.sign({ username }, SECRET, { expiresIn: '7d' });
  return { token, refreshToken, expiresIn: 28800 };
}

async function logout(token) {
  // TODO: invalidate token in blocklist
  return { success: true };
}

module.exports = { login, logout };
