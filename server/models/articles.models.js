const connection = require('../../connection.js');

exports.fetchArticleByID = (article_id) => {
    return connection
    .first('*') 
    .from('articles')
    .where('article_id', '=', article_id)
    .then((article) => {
        return Promise.all 
            ([connection
            .select('*')
            .from('comments')
            .where('article_id', '=', article_id)
            .returning('*'),
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
    return connection('articles')
    .increment('votes', inc_votes)
    .where('article_id', '=', article_id)
    .returning('*')
    .then(([article]) => {
        return article
    });
}

exports.fetchAllArticles = (sort_by = 'created_at', order = 'asc', author, topic) => {
    if(!topic && !author) {
        return connection
        .select('*')
        .from('articles')
        .orderBy(sort_by, order)
        .returning('*')
    }
    if(topic) {
        return connection
        .select('*')
        .from('articles')
        .where('topic', '=', topic)
        .orderBy(sort_by, order)
        .returning('*')
    }
    if(author){
        return connection
        .select('*')
        .from('articles')
        .where('author', '=', author)
        .orderBy(sort_by, order)
        .returning('*')
    }
}