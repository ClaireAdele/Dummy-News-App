const {fetchArticlesByID} = require('../models/articles.models.js')

exports.getArticleByID = (req, res, next) => {
    const {article_id} = req.params;
    fetchArticlesByID(article_id).then((article) => {
        res.send({article});
    });
}
