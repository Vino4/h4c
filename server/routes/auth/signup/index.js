const express = require('express')
    , signupRouter = express.Router()
    , signupControllers = require('./controllers');

signupRouter.post('/', signupControllers.signupController);

module.exports = signupRouter;
