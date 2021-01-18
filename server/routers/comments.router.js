const express = require('express');
const commentsRouter = express.Router({ mergeParams: true });
const { postCommentOnSelectedArticle, getAllCommentsByArticle } = require('../controllers/comments.controllers')
const { handlesInvalidPath, handlesInvalidMethod } = require('../controllers/error.controllers');


commentsRouter.route('/')
.post(postCommentOnSelectedArticle)
.get(getAllCommentsByArticle);

commentsRouter.route('/*')
.all(handlesInvalidPath)
.all(handlesInvalidMethod);

module.exports = commentsRouter;