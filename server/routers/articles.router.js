const express = require('express');
const articlesRouter = express.Router({ mergeParams: true });
const { getArticleByID, deleteArticleByID, patchArticleByID, getAllArticles, postNewArticle } = require('../controllers/articles.controllers.js')
const { handlesInvalidMethod } = require('../controllers/error.controllers');
const commentsRouter = require('./comments.router.js')

articlesRouter.route('/:article_id')
.get(getArticleByID)
.delete(deleteArticleByID)
.patch(patchArticleByID)
.all(handlesInvalidMethod)


articlesRouter.route('/')
.get(getAllArticles)
.post(postNewArticle)
.all(handlesInvalidMethod)



articlesRouter.use('/:article_id/comments', commentsRouter);

module.exports = articlesRouter;