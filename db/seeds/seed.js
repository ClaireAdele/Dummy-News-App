const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');

const {updateDate} = require('../utils/data-manipulation')

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
    console.log(updatedArticles)
    return knex
    .insert(updatedArticles)
    .into('articles')
    .returning('*')
    .then((insertedArticles) => {
      console.log(insertedArticles)
    });
  })
};
