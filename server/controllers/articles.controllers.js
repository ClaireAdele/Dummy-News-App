const {fetchArticlesByID} = require('../models/articles.models.js')

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
