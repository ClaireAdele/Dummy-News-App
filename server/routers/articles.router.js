const express = require('express');
const articlesRouter = express.Router();
const {getArticleByID, deleteArticleByID, patchArticleByID} = require('../controllers/articles.controllers.js')

articlesRouter.get('/:article_id', getArticleByID);
articlesRouter.delete('/:article_id', deleteArticleByID);
articlesRouter.patch('/article_id', patchArticleByID);

articlesRouter.get('/', (req, res, next) => {
    res.send({message : 'articles router working'});
});

module.exports = articlesRouter;