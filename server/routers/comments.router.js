const express = require('express');
const commentsRouter = express.Router({ mergeParams: true });
const { postCommentOnSelectedArticle, getAllCommentsByArticle, patchCommentByID } = require('../controllers/comments.controllers')
const { handlesInvalidMethod } = require('../controllers/error.controllers');


commentsRouter.route('/')
.post(postCommentOnSelectedArticle)
.get(getAllCommentsByArticle)
.all(handlesInvalidMethod)

commentsRouter.route('/:comment_id')
.patch(patchCommentByID)

module.exports = commentsRouter;