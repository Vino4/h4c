const express = require('express')
    , userRouter = express.Router({ mergeParams: true })
    , userControllers = require('./controllers')
    , authenticationMiddleware = require("../../../config/main").authenticationMiddleware;

userRouter.get('/'
             , authenticationMiddleware
             , userControllers.getUserProfileController);

userRouter.put('/'
             , authenticationMiddleware
             , userControllers.updateUserProfileController);

module.exports = userRouter;
