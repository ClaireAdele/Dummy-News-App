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

exports.lookUp = (array,value_1,value_2) =>{
const lookUpData = {}
array.forEach(obj =>{
    lookUpData[obj[`${value_1}`]]=obj[`${value_2}`]
})
return lookUpData
}

exports.modCommentsData = (arrayOfComments, lookUpObj) =>{
 return arrayOfComments.map(comment =>{
     const newComment = {...comment}
     newComment.author =newComment.created_by
     newComment.article_id = lookUpObj[newComment.belongs_to]
     delete newComment.belongs_to
     delete newComment.created_by
     return newComment
 })
}


//lookup usernames
