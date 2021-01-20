const connection = require('../../connection.js');

exports.fetchArticleByID = (article_id) => {
    if(isNaN(article_id)) {
        return Promise.reject({ status: 400, msg: "Not Found - Bad request - article_id must be a number and exist in the database" });
    } else {
    return connection
        .first('*')
        .from('articles')
        .where('article_id', '=', article_id)
        .then((article) => {
            const getCommentsByArticle = connection.
                select('*')
                .from('comments')
                .where('article_id', '=', article_id)
                .returning('*')
            return Promise.all
                ([getCommentsByArticle,
                    article
                ]);
        }).then(([comments, article]) => {
            if (article) {
                const countComments = comments.length;
                article.comments_count = countComments;
            }
            return article;
        })
    }
};

exports.removeArticleByID = (article_id) => {
    if(isNaN(article_id)) {
        return Promise.reject({status : 400, msg : "Bad request - article_id must be a number"})
    }
    return connection('articles')
    .del()
    .where('article_id', '=', article_id)
    .returning('*')
    .then(([deletedArticle]) => {
        return deletedArticle;
    });
};

exports.modifyArticleByID = (article_id, inc_votes = 0) => {
    return connection('articles')
        .increment('votes', inc_votes)
        .where('article_id', '=', article_id)
        .returning('*')
        .then(([article]) => {
            return article;
        });
}


exports.fetchAllArticles = (sort_by = 'created_at', order = 'desc', author, topic) => {
    if (!topic && !author) {
        return connection
            .select('*')
            .from('articles')
            .orderBy(sort_by, order)
            .returning('*')
    }
    if (topic) {
        return connection
            .select('*')
            .from('articles')
            .where('topic', '=', topic)
            .orderBy(sort_by, order)
            .returning('*')
            .then((articles) => {
                if(articles.length === 0) {
                    return Promise.reject({ status: 404, msg: 'Not Found - the topic entered does not match any topics in the database' });
                } else {
                    return articles;
                }
            })
    }
    if (author) {
        return connection
            .select('*')
            .from('articles')
            .where('author', '=', author)
            .orderBy(sort_by, order)
            .returning('*')
            .then((articles) => {
                if(articles.length === 0) {
                    return Promise.reject({ status: 404, msg: 'Not Found - the author entered does not match any authors in the database' });
                } else {
                    return articles;
                }
            })
    }
}

exports.addNewArticle = (username, name, title, body, topic, slug) => {
    return connection
        .first('username')
        .from('users')
        .where('username', '=', username)
        .returning('*')
        .then((checkUser) => {
            if (!checkUser) {
                return Promise.all([connection('users').insert({ username, name })])
            }
        }).then((insertedUser) => {
            return connection
                .first('*')
                .from('topics')
                .where('slug', "=", slug)
                .returning('*')
        }).then((checkSlug) => {
            if (!checkSlug) {
                return Promise.all([connection('topics').insert({ description: topic, slug }).returning('*')])
            }
        }).then((insertedTopic) => {
            return connection('articles')
                .insert({ author: username, title, body, topic: slug })
                .returning('*')
        }).then(([article]) => {
            const getCommentsByArticle = connection.
                select('*')
                .from('comments')
                .where('article_id', '=', article.article_id)
                .returning('*')
            return Promise.all
                ([getCommentsByArticle,
                    article
                ]);
        }).then(([comments, article]) => {
            if (article) {
                const countComments = comments.length;
                article.comments_count = countComments;
            }
            return article;
        })
}

