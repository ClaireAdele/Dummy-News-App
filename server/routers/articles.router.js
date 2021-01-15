const express = require('express');
const articlesRouter = express.Router({ mergeParams: true });
const { getArticleByID, deleteArticleByID, patchArticleByID, getAllArticles, postNewArticle } = require('../controllers/articles.controllers.js')
const { handlesInvalidPath } = require('../controllers/error.controllers');
const commentsRouter = require('./comments.router.js')

articlesRouter.route('/:article_id').get(getArticleByID);
articlesRouter.route('/').get(getAllArticles)
articlesRouter.route('/:article_id').delete(deleteArticleByID);
articlesRouter.route('/:article_id').patch(patchArticleByID);
articlesRouter.route('/').post(postNewArticle);

articlesRouter.use('/:article_id/comments', commentsRouter);
articlesRouter.all('/*', handlesInvalidPath);

module.exports = articlesRouter;