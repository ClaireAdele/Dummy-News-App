const express = require("express");
const topicsRouter = express.Router({ mergeParams: true });
const { getAllTopics } = require("../controllers/topics.controller");
const { handlesInvalidMethod } = require('../controllers/error.controllers');


topicsRouter.route("/")
.get(getAllTopics)
.all(handlesInvalidMethod)

module.exports = topicsRouter;