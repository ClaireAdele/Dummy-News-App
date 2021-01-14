const { writeCommentOnSelectedArticle } = require('../models/comments.models.js');

exports.postCommentOnSelectedArticle = (req, res, next) => {
    const { article_id } = req.params;
    const { username } = req.body;
    const { body } = req.body;
    writeCommentOnSelectedArticle(article_id, username, body).then((comment) => {
        if(!comment) {
            return Promise.reject({ status : 404, msg : 'Not Found - can\'t post article if article_id does not exist in database' });
        }
        res.status(201).send({comment});
    }).catch((err) => {
        next(err);
    });
}