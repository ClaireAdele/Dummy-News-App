const express = require('express');
const commentsRouter = express.Router({ mergeParams: true });
const { postCommentOnSelectedArticle, getAllCommentsByArticle } = require('../controllers/comments.controllers')

commentsRouter.route('/').post(postCommentOnSelectedArticle);
commentsRouter.route('/').get(getAllCommentsByArticle);

module.exports = commentsRouter;