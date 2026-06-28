const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

async function register(username, password, email) {
  if (!username || !password || !email) {
    throw new Error('All fields are required');
  }
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  // TODO: persist to database
  return { username, email, passwordHash: hash };
}

module.exports = { register };
