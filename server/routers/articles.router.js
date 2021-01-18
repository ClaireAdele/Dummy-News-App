const express = require('express');
const articlesRouter = express.Router({ mergeParams: true });
const { getArticleByID, deleteArticleByID, patchArticleByID, getAllArticles, postNewArticle } = require('../controllers/articles.controllers.js')
const { handlesInvalidPath, handlesInvalidMethod } = require('../controllers/error.controllers');
const commentsRouter = require('./comments.router.js')

articlesRouter.route('/:article_id')
.get(getArticleByID)
.delete(deleteArticleByID)
.patch(patchArticleByID);

articlesRouter.route('/')
.get(getAllArticles)
.post(postNewArticle);

articlesRouter.use('/:article_id/comments', commentsRouter);
articlesRouter.route('/*')
.all(handlesInvalidPath)
.all(handlesInvalidMethod);

module.exports = articlesRouter;