const express = require('express');
const articlesRouter = express.Router({ mergeParams: true });
const { getArticleByID, deleteArticleByID, patchArticleByID, getAllArticles, postNewArticle } = require('../controllers/articles.controllers.js')
const commentsRouter = require('./comments.router.js')

articlesRouter.get('/:article_id', getArticleByID);
articlesRouter.get('/', getAllArticles)
articlesRouter.delete('/:article_id', deleteArticleByID);
articlesRouter.patch('/:article_id', patchArticleByID);
articlesRouter.post('/', postNewArticle);

articlesRouter.use('/:article_id/comments', commentsRouter);

articlesRouter.get('/', (req, res, next) => {
    res.send({ message: 'articles router working' });
});

module.exports = articlesRouter;