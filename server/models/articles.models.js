const connection = require('../../connection.js');

// const fetchCommentCount = (article) => {
//     return connection
//     .select('*')
//     .from('comments')
//     .where('article_id', '=', article.article_id)
//     .then((comments) => {
//         console.log(comments.length)
//         return comments.length;
//     })
// }
// I had a problem with this method since the promise remained pending, then I figured out I could use Promise.all so that any asynchronous queries would resolve before sending response.

exports.fetchArticlesByID = (article_id) => {
    return connection
    .first('*') //same as select, except gives first element that it finds
    .from('articles')
    .where('article_id', '=', article_id)
    .then((article) => {
        return Promise.all 
            ([
            connection
            .select('*')
            .from('comments')
            .where('article_id', '=', article_id), 
            article
            ]);
    }).then(([comments, article]) => {
        if(article) {
            const countComments = comments.length;
            article.comments_count = countComments;
        } 
        return article;
    })
};
     