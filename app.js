const express = require("express")
const app = express()
const apiRouter = require("./server/routers/api.router")
const { handlePSQLErrors, handlesInvalidPath, handlesInvalidInput, handlesUnknownError } = require('./server/controllers/error.controllers')

app.use(express.json());

app.use("/api", apiRouter);
app.all('/*', handlesInvalidPath);

app.use(handlePSQLErrors); //order matters
app.use(handlesInvalidInput);
app.use(handlesUnknownError)

module.exports = app;