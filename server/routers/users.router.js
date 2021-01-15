const express = require("express");
const usersRouter = express.Router({ mergeParams: true });
const { getUserByUsername } = require('../controllers/users.controllers.js')

usersRouter.route('/:username').get(getUserByUsername);

module.exports = usersRouter;