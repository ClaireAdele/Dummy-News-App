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

// what remains to be done :
//- I need to write the last couple of functions and catch errors as well:

// DELETE /api/comments/:comment_id

// GET /api ??

// DELETE /api/articles/:article_id ??
// POST /api/topics ?? 
// POST /api/users ??
// GET /api/users ??

//- I need to add comments throughout to make my work more readable.
//- I need to choose what to send back if the query sort_by is invalid [200, 400],
//  either serving back an unpatched comment or throwing and error.
// - I need to add a comments_count to a couple of functions that send back an article I think.