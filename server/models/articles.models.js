const connection = require('../../connection.js');
const articlesRouter = require('../routers/articles.router.js');

exports.fetchArticleByID = (article_id) => {
    return connection
    .first('*') 
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

exports.removeArticleByID = (article_id) => {
    return connection
    .first('*') 
    .from('articles')
    .where('article_id', '=', article_id)
    .then((article) => {
        if(article) {
        return connection('articles')
        .del()
        .where('article_id', '=', article_id)
        } else {
            return article;
        }
    });
};

exports.modifyArticleByID = (article_id, inc_votes) => {
    return connection
    .first('*') 
    .from('articles')
    .where('article_id', '=', article_id)
    .then((article) => {
        if(article) {
        article.votes = (article.votes) + inc_votes;
            if(article.votes < 0) {
                article.votes = 0;
            }
        }
        return article
    })
}