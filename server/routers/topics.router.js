const express = require("express");
const topicsRouter = express.Router({ mergeParams: true });
const { getAllTopics } = require("../controllers/topics.controller");

topicsRouter.route("/").get(getAllTopics);

topicsRouter.get('/', (req, res, next) => {
    res.send({ message: 'topics router working' });
});

module.exports = topicsRouter;