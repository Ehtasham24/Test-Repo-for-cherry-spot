function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message, status });
}

function notFound(req, res) {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found`, status: 404 });
}

module.exports = { errorHandler, notFound };
