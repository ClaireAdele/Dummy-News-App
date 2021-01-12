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
    .select('*')
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
        const countComments = comments.length;
        article[0].comments_count = countComments;
        return article;
    })
};
     