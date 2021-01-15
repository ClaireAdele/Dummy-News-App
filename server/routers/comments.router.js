const express = require('express');
const commentsRouter = express.Router({ mergeParams: true });
const { postCommentOnSelectedArticle, getAllCommentsByArticle } = require('../controllers/comments.controllers')
const { handlesInvalidPath } = require('../controllers/error.controllers');


commentsRouter.route('/').post(postCommentOnSelectedArticle);
commentsRouter.route('/').get(getAllCommentsByArticle);

commentsRouter.all('/*', handlesInvalidPath);

module.exports = commentsRouter;