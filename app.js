const express = require("express")
const app = express()
const apiRouter = require("./server/routers/api.router")
const {handlePSQLErrors, handlesInvalidPath } = require('./server/controllers/error.controllers')

app.use(express.json());

app.use("/api",apiRouter);
app.use(handlePSQLErrors); 
app.all('/*', handlesInvalidPath);
//all methods get, post, etc. will invoke this if path is wrong. 
//custom errs/ server errors


module.exports= app