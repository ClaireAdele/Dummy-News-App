const { writeCommentOnSelectedArticle } = require('../models/comments.models.js');

exports.postCommentOnSelectedArticle = (req, res, next) => {
    const { article_id } = req.params;
    const { username } = req.body;
    const { body } = req.body;
    writeCommentOnSelectedArticle(article_id, username, body).then((comment) => {
        res.status(201).send({comment});
    }).catch((err) => {
        console.log(err);
    });
}