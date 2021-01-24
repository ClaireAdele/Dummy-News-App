const connection = require('../../connection.js');

//Gets an article corresponding to a particular article_id
//If the article_id doesn't exist, returns 404 Not Found
//If the article_id is not a number, returns 400 Bad request
//Adds a property comments_count to the response object
exports.fetchArticleByID = (article_id) => {
    if (isNaN(article_id)) {
        return Promise.reject({ status: 400, msg: "Bad request - article_id must be a number and exist in the database" });
    } else {
        return connection
            .first('*')
            .from('articles')
            .where('article_id', '=', article_id)
            .then((article) => {
                const getCommentsByArticle = connection.
                    select('*')
                    .from('comments')
                    .where('article_id', '=', article_id)
                    .returning('*')
                return Promise.all
                    ([getCommentsByArticle,
                        article
                    ]);
            }).then(([comments, article]) => {
                if (!article) {
                    return Promise.reject({ status: 404, msg: "Not Found - article_id does not exist in database" });
                } else {
                    const countComments = comments.length;
                    article.comments_count = countComments;
                    return article;
                }
            })
    }
};

//Deletes an article corresponding to a valid article_id
//Returns a status 204 if the article_id exists in the database
//Otherwise, if article_id does not correspond to anything in the, returns 404, not found
//If the article_id is not a number, returns 400, Bad Request
exports.removeArticleByID = (article_id) => {
    if (isNaN(article_id)) {
        return Promise.reject({ status: 400, msg: "Bad request - article_id must be a number" })
    }
    return connection('articles')
        .del()
        .where('article_id', '=', article_id)
        .returning('*')
        .then(([deletedArticle]) => {
            if (!deletedArticle) {
                return Promise.reject({ status: 404, msg: 'Not Found - can\'t delete article if article_id does not exist in database' })
            }
        });
};

//Patches the article corresponding to the article_id on the request, and increments the "votes" property of the article object.
//The request must have a valid article_id and a valid inc_votes object.
//If the article_id is not a number, throws a 400 error Bad Request.
//If the article_id does not exist in the database, throws a 404 error.
//If the inc_vote object is invalid, i.e not a number, throws a 400 Bad request.
exports.modifyArticleByID = (article_id, inc_votes = 0) => {
    if (isNaN(inc_votes)) {
        return Promise.reject({ status: 400, msg: 'Incorrect request - request must be formatted to conform to following model : {inc_votes : vote_number}' });
    } else {
        return connection('articles')
            .increment('votes', inc_votes)
            .where('article_id', '=', article_id)
            .returning('*')
            .then(([article]) => {
                if (!article) {
                    return Promise.reject({ status: 404, msg: 'Not Found - can\'t patch article if article_id does not exist in database' })
                } else {
                    return article;
                }
            });
    }
}

//Gets all of the articles, sends them back ordered by their created_at property of no sort-by query is added onto the request body.
//Takes up to four different types of parameters on the query: author, topic, order and sort_by. 
//If author or topic entered do not exist in the database, sends back 404 Not Found.
exports.fetchAllArticles = (sort_by = 'created_at', order = 'desc', author, topic) => {
    if (!topic && !author) {
        return connection
            .select('*')
            .from('articles')
            .orderBy(sort_by, order)
            .returning('*')
    }
    if (topic) {
        return connection
            .select('*')
            .from('articles')
            .where('topic', '=', topic)
            .orderBy(sort_by, order)
            .returning('*')
            .then((articles) => {
                if (articles.length === 0) {
                    return Promise.reject({ status: 404, msg: 'Not Found - the topic entered does not match any topics in the database' });
                } else {
                    return articles;
                }
            })
    }
    if (author) {
        return connection
            .select('*')
            .from('articles')
            .where('author', '=', author)
            .orderBy(sort_by, order)
            .returning('*')
            .then((articles) => {
                if (articles.length === 0) {
                    return Promise.reject({ status: 404, msg: 'Not Found - the author entered does not match any authors in the database' });
                } else {
                    return articles;
                }
            })
    }
}

//Creates a new article in the database, with the appropriate username, name, title, body, topic and slug properties.
exports.addNewArticle = (username, name, title, body, topic, slug) => {
    return connection
        .first('username')
        .from('users')
        .where('username', '=', username)
        .returning('*')
        .then((checkUser) => {
            if (!checkUser) {
                return Promise.all([connection('users').insert({ username, name })])
            }
        }).then(() => {
            return connection
                .first('*')
                .from('topics')
                .where('slug', "=", slug)
                .returning('*')
        }).then((checkSlug) => {
            if (!checkSlug) {
                return Promise.all([connection('topics').insert({ description: topic, slug }).returning('*')])
            }
        }).then(() => {
            return connection('articles')
                .insert({ author: username, title, body, topic: slug })
                .returning('*')
        }).then(([article]) => {
            const getCommentsByArticle = connection.
                select('*')
                .from('comments')
                .where('article_id', '=', article.article_id)
                .returning('*')
            return Promise.all
                ([getCommentsByArticle,
                    article
                ]);
        }).then(([comments, article]) => {
            const countComments = comments.length;
            article.comments_count = countComments;
            return article;
        })
}

