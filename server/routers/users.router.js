const express = require("express");
const usersRouter = express.Router({ mergeParams: true });
const { getUserByUsername } = require('../controllers/users.controllers.js');
const { handlesInvalidPath } = require('../controllers/error.controllers');


usersRouter.route('/:username').get(getUserByUsername);

usersRouter.route('/*')
.all(handlesInvalidPath)
.all(handlesInvalidMethod);

module.exports = usersRouter;