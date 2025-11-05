const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const TripRouter = require('./routes/TripRouter');
const UserRouter = require('./routes/UserRouter');
const AuthRouter = require('./routes/AuthRouter.js');

app.use(express.json());
app.use('/trips', TripRouter);
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);

module.exports = {app};