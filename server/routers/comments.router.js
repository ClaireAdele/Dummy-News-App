const express = require('express');
const commentsRouter = express.Router({ mergeParams : true });
const {postCommentOnSelectedArticle} = require('../controllers/comments.controllers')

commentsRouter.post('/', postCommentOnSelectedArticle);

commentsRouter.get('/', (req, res, next) => {
    res.send({message : 'comments router working'});
});

module.exports = commentsRouter;