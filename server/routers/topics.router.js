const express = require("express");
const topicsRouter = express.Router({ mergeParams: true });
const { getAllTopics } = require("../controllers/topics.controller");

topicsRouter.route("/").get(getAllTopics);


module.exports = topicsRouter;