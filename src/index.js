const express = require('express');
const apiRoutes = require('./api/routes');
const { errorHandler, notFound } = require('./api/errorHandler');

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
