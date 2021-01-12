const connection = require('../../connection.js');

exports.fetchArticlesByID = (article_id) => {
    return connection
    .select('*')
    .from('articles')
    .where('article_id', '=', article_id)
    .then((article) => {
        console.log(article);
        return article;
    })
}
