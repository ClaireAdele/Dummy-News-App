const { writeCommentOnSelectedArticle, fetchAllCommentsByArticle, modifyCommentByID, removeCommentByID } = require('../models/comments.models.js');


//Posts a comment to an article corresponding to the article_id on the request.
//The request takes a valid username and body.
//If the username does not exist in the database, sends 400, incorrect request.
//If the body is non-existent, sends 400, incorrect request.
//If article_id is not a number, sends back 400, incorrect request.
//If the article_id does not correspond to any articles in the database, sends back 404 Not Found.
exports.postCommentOnSelectedArticle = (req, res, next) => {
    const { article_id } = req.params;
    const { username } = req.body;
    const { body } = req.body;
    writeCommentOnSelectedArticle(article_id, username, body).then((comment) => {
        res.status(201).send({ comment });
    }).catch(next);
}

//Gets all the comments associated with a particular article, and sends them back sorted by descending created_by order by default if nothing is specified on the request query. 
//If the article doesn't exist in the database, sends back a 404 Not Found.
exports.getAllCommentsByArticle = (req, res, next) => {
    const { article_id } = req.params;
    const { sort_by, order } = req.query;
    fetchAllCommentsByArticle(article_id, sort_by, order).then((comments) => {
        res.send({ comments });
    }).catch(next);
}

//Patches the vote property of the comment associated to the comment_id on the request.
//If the inc_votes or the comment_id on the request is not a number, sends back a 400 Bad Request.
//If the comment_id does not correspond to a comment in the database, sends back 404 Not Found.
exports.patchCommentByID = (req, res, next) => {
    const { comment_id } = req.params;
    const { inc_votes } = req.body;
    modifyCommentByID(comment_id, inc_votes).then((comment) => {
        res.status(201).send({comment})
    }).catch(next)
}

//Deletes a comment corresponding to the comment_id on the request. 
//If the comment_id is not a number, sends back a 400, Bad Request.
//If the comment_id is a number but doesn't exist in the database, sends back a 404 Not Found.
exports.deleteCommentByID = (req, res, next) => {
    const {comment_id} = req.params;
    removeCommentByID(comment_id).then(() => {
        res.sendStatus(204);
    }).catch(next)
}