
const { selectAllTopics } = require("../models/topics.model")

exports.getAllTopics = (req, res, next) => {
  selectAllTopics().then((topics) => {
    res.send({ topics })
  }).catch(next);
}