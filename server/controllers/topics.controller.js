const { selectAllTopics } = require("../models/topics.model")

//Gets all the topics from the database
exports.getAllTopics = (req, res, next) => {
  selectAllTopics().then((topics) => {
    res.send({ topics })
  }).catch(next);
}