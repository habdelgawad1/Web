const express = require('express');
const { signup, login } = require('../controller/authController');

const AuthRouter = express.Router();

AuthRouter.route('/signup')
    .post(signup);

AuthRouter.route('/login')
    .post(login);

module.exports = AuthRouter;