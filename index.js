const express = require('express');
const app = express();
const TripRouter = require('./routes/TripRouter');

app.use(express.json());
app.use('/trips', TripRouter);
app.use('/users', require('./routes/UserRouter'));
app.use('/auth', require('./routes/AuthRouter'));

module.exports = app;