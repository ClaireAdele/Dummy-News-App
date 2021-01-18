const express = require("express");
const topicsRouter = express.Router({ mergeParams: true });
const { getAllTopics } = require("../controllers/topics.controller");
const { handlesInvalidPath, handlesInvalidMethod } = require('../controllers/error.controllers');


topicsRouter.route("/").get(getAllTopics);

topicsRouter.route('/*')
.all(handlesInvalidPath)
.all(handlesInvalidMethod);

module.exports = topicsRouter;