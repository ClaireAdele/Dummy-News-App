exports.updateDate = ((articlesArray) => {
    return articlesArray.map((article) => {
        let newDate = new Date(article.created_at);
        article.created_at = newDate;
        return article;
    });
})

exports.deleteVotes = (array) => {
    return array.map(obj => {
        delete obj.votes
        return obj
    })
}

exports.lookUp = (array) =>{
const lookUpData = {}
array.forEach(obj =>{
    lookUpData[obj.title]=obj.article_id
})
return lookUpData
}

exports.modCommentsData = (arrayOfComments, lookUpObj) =>{
 return arrayOfComments.map(comment =>{
     const newComment = {...comment}
     newComment.article_id = lookUpObj[newComment.belongs_to]
     delete newComment.belongs_to
     return newComment
 })
}

//lookup usernames
