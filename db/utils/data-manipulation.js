exports.updateDate = ((articlesArray) => {
    return articlesArray.map((article) => {
        let newDate = new Date(article.created_at);
        article.created_at = newDate;
        return article;
    });
})

//lookup usernames
