const updateUserProfileController = require('./updateUserProfileController');
const getUserProfileController    = require('./getUserProfileController');

let profileControllers = {
    getUserProfileController,
    updateUserProfileController,
}

module.exports = profileControllers;
