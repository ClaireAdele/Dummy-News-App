const {fetchArticlesByID, removeArticlesByID} = require('../models/articles.models.js')

exports.getArticleByID = (req, res, next) => {
    const {article_id} = req.params;
    fetchArticlesByID(article_id).then((article) => {
        if(!article) {
            return Promise.reject({status : 404, msg : 'Not Found - article_id does not exist in database'})
        }
        res.send({article});
    }).catch((err) => {
        next(err);
    });
}

exports.deleteArticleByID = (req, res, next) => {
    const {article_id} = req.params;
    removeArticlesByID(article_id).then((article) => {
        if(!article) {
            return Promise.reject({status : 404, msg : 'Not Found - can\'t delete article if article_id does not exist in database'})
        }
        res.sendStatus(204);
    }).catch((err) => {
        next(err);
    });
}
