const updateUserProfileController = require('./updateUserProfileController');
const updateUserPasswordController = require('./updateUserPasswordController');
const getUserProfileController    = require('./getUserProfileController');

let profileControllers = {
    getUserProfileController,
    updateUserProfileController,
    updateUserPasswordController,
}

module.exports = profileControllers;
