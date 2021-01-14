const {fetchArticleByID, removeArticleByID, modifyArticleByID} = require('../models/articles.models.js')

exports.getArticleByID = (req, res, next) => {
    const {article_id} = req.params;
    fetchArticleByID(article_id).then((article) => {
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
    removeArticleByID(article_id).then((article) => {
        if(!article) {
            return Promise.reject({status : 404, msg : 'Not Found - can\'t delete article if article_id does not exist in database'})
        }
        res.sendStatus(204);
    }).catch((err) => {
        next(err);
    });
}

exports.patchArticleByID = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    modifyArticleByID(article_id, inc_votes).then(
    (article) => {
        if(isNaN(inc_votes)){
            return Promise.reject({status : 400, msg : 'Incorrect request - request must be formatted to conform to following model : {inc_votes : vote_number}'});
        }
        if(!article) {
            return Promise.reject({status : 404, msg : 'Not Found - can\'t patch article if article_id does not exist in database'})
        }
        res.status(201).send({article});
    }).catch((err) => {
        next(err);
    });
}