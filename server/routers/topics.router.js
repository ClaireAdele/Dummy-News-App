const express = require("express");
const topicsRouter = express.Router({ mergeParams: true });
const { getAllTopics } = require("../controllers/topics.controller");
const { handlesInvalidPath, handlesInvalidMethod, handlesInvalidInput } = require('../controllers/error.controllers');


topicsRouter.route("/")
.get(getAllTopics)
.all(handlesInvalidMethod)


// topicsRouter.all('/*', handlesInvalidPath);

module.exports = topicsRouter;