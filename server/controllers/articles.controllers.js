const { fetchArticleByID, removeArticleByID, modifyArticleByID, fetchAllArticles, addNewArticle } = require('../models/articles.models.js')

//Gets an article corresponding to a particular article_id
//If the article_id doesn't exist, returns 404 Not Found
//If the article_id is not a number, returns 400 Bad request
//Adds a property comments_count to the response object
exports.getArticleByID = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticleByID(article_id).then((article) => {
        res.send({ article });
    }).catch(next);
}

//Deletes an article corresponding to a valid article_id
//Returns a status 204 if the article_id exists in the database
//Otherwise, if article_id does not correspond to anything in the, returns 404, not found
//If the article_id is not a number, returns 400, Bad Request
exports.deleteArticleByID = (req, res, next) => {
    const { article_id } = req.params;
    removeArticleByID(article_id).then(() => {
        res.sendStatus(204);
    }).catch(next)
}

//Patches the article corresponding to the article_id on the request, and increments the "votes" property of the article object.
//The request must have a valid article_id and a valid inc_votes object.
//If the article_id is not a number, throws a 400 error Bad Request.
//If the article_id does not exist in the database, throws a 404 error.
//If the inc_vote object is invalid, i.e not a number, throws a 400 Bad request.
exports.patchArticleByID = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    modifyArticleByID(article_id, inc_votes).then(
        (article) => {
            res.send({ article });
        }).catch(next);
}

//Gets all of the articles, sends them back ordered by their created_at property of no sort-by query is added onto the request body.
//Takes up to four different types of parameters on the query: author, topic, order and sort_by. 
//If author or topic entered do not exist in the database, sends back 404 Not Found.
exports.getAllArticles = (req, res, next) => {
    const { sort_by, order, author, topic } = req.query

    fetchAllArticles(sort_by, order, author, topic).then((articles) => {
        res.send({ articles });
    }).catch(next)
}

//Creates a new article in the database, with the appropriate username, name, title, body, topic and slug properties.
exports.postNewArticle = (req, res, next) => {
    const { username, name, title, body, topic, slug } = req.body;
    addNewArticle(username, name, title, body, topic, slug).then((article) => {
        res.status(201).send({article});
    }).catch(next)
}