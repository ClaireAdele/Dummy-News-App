const connection = require('../../connection.js');

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

exports.removeArticlesByID = (article_id) => {
    return connection
    .first('*') //same as select, except gives first element that it finds
    .from('articles')
    .where('article_id', '=', article_id)
    .then((article) => {
        if(article) {
        return connection('articles')
        .del()
        .where('article_id', '=', article_id)
        } else {
            console.log(article)
            return article;
        }
    });
};
