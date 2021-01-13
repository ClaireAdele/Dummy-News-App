const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');

const {updateDate,deleteVotes,lookUp,modCommentsData} = require('../utils/data-manipulation')

exports.seed = function (knex) {
  return knex
  .migrate
  .rollback()
  .then(() => {
    return knex.migrate.latest();
  }).then(() => {
    return knex
  .insert(topicData)
  .into('topics')
  .returning('*')
  }).then((insertedTopics) => {
    return knex
    .insert(userData)
    .into('users')
    .returning('*')
  }).then((insertedUsers) => {
    const updatedArticles = updateDate(articleData)
    return knex
    .insert(updatedArticles)
    .into('articles')
    .returning('*')
  }).then((insertedArticles) => {
      const lookUpArticle = lookUp(insertedArticles,"title","article_id");
      const updatedTimestampComments = updateDate(commentData);
      const withDeletedVotes = deleteVotes(updatedTimestampComments);
      const updatedComments = modCommentsData(withDeletedVotes,lookUpArticle);
      return knex
      .insert(updatedComments)
      .into("comments")
      .returning("*")
  })
};
