const connection = require('../../connection.js');

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
                    return undefined;
                }
            });
    }
}

exports.fetchAllCommentsByArticle = (article_id, sort_by = 'created_at', order = 'desc') => {
    return connection
        .first('*')
        .from('articles')
        .where('article_id', '=', article_id)
        .returning('*')
        .then((article) => {
            if (article) {
                return connection('comments')
                    .select('*')
                    .from('comments')
                    .where('article_id', '=', article_id)
                    .orderBy(sort_by, order)
                    .returning('*')
                    .then((comments) => {
                        return comments;
                    });
            } else {
                return undefined;
            }
        });
}

exports.modifyCommentByID = (comment_id, inc_votes = 0) => {
    if(isNaN(inc_votes) || isNaN(comment_id)) {
        return Promise.reject({status : 400, msg : "Bad request - the comment_id and the inc_votes request must both be numbers" });
    }
    return connection('comments')
    .increment('votes', inc_votes)
    .where('comment_id', '=', comment_id)
    .returning('*')
    .then(([comment]) => {
        return comment;
    })

}