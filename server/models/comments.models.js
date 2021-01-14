const connection = require('../../connection.js');

exports.writeCommentOnSelectedArticle = (article_id, username, body) => {
    if(!username || !body) {
        return Promise.reject({ status : 400, msg : "Incorrect request - request must be formatted to conform to following model : {username, body}" });
    } else {
        return connection
        .first('*')
        .from('articles')
        .where('article_id', '=', article_id)
        .returning('*')
        .then((article) => {
            if(article) {
            return connection('comments')  
            .insert({author : username, body, article_id})
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