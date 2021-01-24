const express = require("express");
const usersRouter = express.Router({ mergeParams: true });
const { getUserByUsername } = require('../controllers/users.controllers.js');
const { handlesInvalidMethod } = require('../controllers/error.controllers');


usersRouter.route('/:username')
.get(getUserByUsername)
.all(handlesInvalidMethod)

module.exports = usersRouter;