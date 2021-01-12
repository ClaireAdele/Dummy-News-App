const {fetchArticlesByID} = require('../models/articles.models.js')

exports.getArticleByID = (req, res, next) => {
    const {article_id} = req.params;
    console.log(article_id)
    fetchArticlesByID(article_id).then((article) => {
        res.send({article});
    })
}

// esponds with
// an article object, which should have the following properties:

// author which is the username from the users table
// title
// article_id
// body
// topic
// created_at
// votes
// comment_count which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this