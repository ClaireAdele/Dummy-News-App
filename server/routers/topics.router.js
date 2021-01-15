const express = require("express");
const topicsRouter = express.Router({ mergeParams: true });
const { getAllTopics } = require("../controllers/topics.controller");
const { handlesInvalidPath } = require('../controllers/error.controllers');


topicsRouter.route("/").get(getAllTopics);

topicsRouter.all('/*', handlesInvalidPath);

module.exports = topicsRouter;