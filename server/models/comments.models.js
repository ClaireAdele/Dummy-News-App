const connection = require('../../connection.js');

exports.writeCommentOnSelectedArticle = (article_id, username, body) => {
    return connection('comments')  
    .insert({author : username, body, article_id})
    .returning('*')
    .then(([newComment]) => {
        return newComment;
    });
}