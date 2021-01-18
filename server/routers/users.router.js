const express = require("express");
const usersRouter = express.Router({ mergeParams: true });
const { getUserByUsername } = require('../controllers/users.controllers.js');
const { handlesInvalidPath, handlesInvalidMethod, handlesInvalidInput } = require('../controllers/error.controllers');


usersRouter.route('/:username')
.get(getUserByUsername)
.all(handlesInvalidInput)
.all(handlesInvalidMethod)


// usersRouter.all('/*', handlesInvalidPath)



module.exports = usersRouter;