const connection = require('../../connection.js');

//Posts a comment to an article corresponding to the article_id on the request.
//The request takes a valid username and body.
//If the username does not exist in the database, sends 400, incorrect request.
//If the body is non-existent, sends 400, incorrect request.
//If article_id is not a number, sends back 400, incorrect request.
//If the article_id does not correspond to any articles in the database, sends back 404 Not Found.
exports.writeCommentOnSelectedArticle = (article_id, username, body) => {
    if (!username || !body) {
        return Promise.reject({ status: 400, msg: "Incorrect request - request must be formatted to conform to following model : {username, body}" });
    } else if (isNaN(article_id)) {
        return Promise.reject({ status: 400, msg: "Bad request - article_id must be a number" })
    } else {
        return connection
            .first('*')
            .from('articles')
            .where('article_id', '=', article_id)
            .returning('*')
            .then((article) => {
                if (article) {
                    return connection('comments')
                        .insert({ author: username, body, article_id })
                        .returning('*')
                        .then(([newComment]) => {
                            return newComment;
                        });
                } else {
                    return Promise.reject({ status: 404, msg: 'Not Found - can\'t post comment if article_id does not exist in database' });
                }
            });
    }
}

//Gets all the comments associated with a particular article, and sends them back sorted by descending created_by order by default if nothing is specified on the request query. 
//If the article doesn't exist in the database, sends back a 404 Not Found.
//It returns a 404 if there are no comments associated to the article selecteed.
exports.fetchAllCommentsByArticle = (article_id, sort_by = 'created_at', order = 'desc') => {
    return connection
        .first('*')
        .from('articles')
        .where('article_id', '=', article_id)
        .returning('*')
        .then((article) => {
            if (!article) {
                return Promise.reject({ status: 404, msg: 'Not Found - can\'t get comments if article_id does not exist in database' });
            } else {
                return connection('comments')
                    .select('*')
                    .from('comments')
                    .where('article_id', '=', article_id)
                    .orderBy(sort_by, order)
                    .returning('*')
                    .then((comments) => {
                        if(comments) {
                           return comments; 
                        } else {
                            return Promise.reject({status: 404, msg: 'Not Found - there are no comments posted on this article'})
                        }
                    });
            }
        });
}

//Patches the vote property of the comment associated to the comment_id on the request.
//If the inc_votes or the comment_id on the request is not a number, sends back a 400 Bad Request.
//If the comment_id does not correspond to a comment in the database, sends back 404 Not Found.
exports.modifyCommentByID = (comment_id, inc_votes = 0) => {
    if (isNaN(inc_votes) || isNaN(comment_id)) {
        return Promise.reject({ status: 400, msg: "Bad request - the comment_id and the inc_votes request must both be numbers" });
    }
    return connection('comments')
        .increment('votes', inc_votes)
        .where('comment_id', '=', comment_id)
        .returning('*')
        .then(([comment]) => {
            if(comment) {
                return comment;
            } else {
                return Promise.reject({status: 404, msg: 'Not Found - the comment_id does not correspond to a comment in the database'})
            }  
        })

}

//Deletes a comment corresponding to the comment_id on the request. 
//If the comment_id is not a number, sends back a 400, Bad Request.
//If the comment_id is a number but doesn't exist in the database, sends back a 404 Not Found.
exports.removeCommentByID = (comment_id) => {
    if (isNaN(comment_id)) {
        return Promise.reject({ status: 400, msg: "Bad request - comment_id must be a number" })
    }
    return connection('comments')
        .del()
        .where('comment_id', '=', comment_id)
        .returning('*')
        .then(([deletedComment]) => {
            if (!deletedComment) {
                return Promise.reject({ status: 404, msg: 'Not Found - can\'t delete comment if comment_id does not exist in database' })
            }
        });
}