const express = require('express');
const articlesRouter = express.Router();
const {getArticleByID} = require('../controllers/articles.controllers.js')

articlesRouter.use('/:article_id', getArticleByID);

articlesRouter.get('/', (req, res, next) => {
    res.send({message : 'articles router working'});
});

module.exports = articlesRouter;