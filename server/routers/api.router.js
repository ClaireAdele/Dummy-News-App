const express = require("express");
const apiRouter = express.Router({ mergeParams: true });
const topicsRouter = require("./topics.router.js");
const usersRouter = require("./users.router.js");
const articlesRouter = require("./articles.router.js")
const commentsRouter = require("./comments.router.js")
const { handlesInvalidPath, handlesInvalidMethod } = require('../controllers/error.controllers');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

apiRouter.route('/*')
.all(handlesInvalidPath)
.all(handlesInvalidMethod);

module.exports = apiRouter;