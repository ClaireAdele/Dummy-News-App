exports.updateDate = ((articlesArr) => {
    return articlesArr.map((article) => {
        const newArticle = {...article};
        let newDate = new Date(article.created_at);
        newArticle.created_at = newDate;
        return newArticle;
    });
})

exports.lookUp = (array,value_1,value_2) =>{
    const lookUpData = {}
    array.forEach(obj => {
        lookUpData[obj[`${value_1}`]]=obj[`${value_2}`];
    })
    return lookUpData;
}

exports.modCommentsData = (arrayOfComments, lookUpObj) =>{
        return arrayOfComments.map(comment => {
        const newComment = {...comment};
        newComment.author = newComment.created_by;
        newComment.article_id = lookUpObj[newComment.belongs_to];
        delete newComment.belongs_to;
        delete newComment.created_by;
        return newComment;
    });
}