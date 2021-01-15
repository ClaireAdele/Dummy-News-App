const express = require("express");
const apiRouter = express.Router({ mergeParams: true });
const topicsRouter = require("./topics.router.js");
const usersRouter = require("./users.router.js");
const articlesRouter = require("./articles.router.js")
const commentsRouter = require("./comments.router.js")
const { handlesInvalidPath } = require('../controllers/error.controllers');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

apiRouter.all('/*', handlesInvalidPath);


module.exports = apiRouter;