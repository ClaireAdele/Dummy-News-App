const express = require("express");
const usersRouter = express.Router({ mergeParams: true });
const { getUserByUsername } = require('../controllers/users.controllers.js')

usersRouter.use('/:username', getUserByUsername);

usersRouter.get('/', (req, res, next) => {
    res.send({ message: 'users router working' });
});

module.exports = usersRouter;