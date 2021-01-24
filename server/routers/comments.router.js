const express = require('express');
const commentsRouter = express.Router({ mergeParams: true });
const { postCommentOnSelectedArticle, getAllCommentsByArticle, patchCommentByID, deleteCommentByID } = require('../controllers/comments.controllers')
const { handlesInvalidMethod } = require('../controllers/error.controllers');


commentsRouter.route('/')
.post(postCommentOnSelectedArticle)
.get(getAllCommentsByArticle)
.all(handlesInvalidMethod)

commentsRouter.route('/:comment_id')
.patch(patchCommentByID)
.delete(deleteCommentByID)
.all(handlesInvalidMethod)

module.exports = commentsRouter;