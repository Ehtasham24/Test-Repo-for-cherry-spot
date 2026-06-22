const config = {
  app: {
    name: process.env.APP_NAME || 'TaskManager',
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES || '8h',
  },
  db: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/taskmanager',
  },
};

module.exports = config;
