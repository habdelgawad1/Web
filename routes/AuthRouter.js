const express = require('express');
const { signup, login } = require('../controller/authController');
const {validateLogin, validateSignup} = require('../validators/validator');

const AuthRouter = express.Router();

AuthRouter.route('/signup')
    .post(validateSignup, signup);

AuthRouter.route('/login')
    .post(validateLogin, login);

module.exports = AuthRouter;