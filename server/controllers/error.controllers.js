//Middleware error-handler handles all custom errors coming from the model functions.
exports.handlesInvalidInput = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
}

//Middleware error-handler handles any errors I might have missed in my custom error-handling & testing.
exports.handlesUnknownError = (err, req, res, next) => {
    res.status(500).send({ 'message' : 'Error unknown - try again later'});
}

//Controller function that handles non-existant urls.
exports.handlesInvalidPath = (req, res, next) => {
    res.status(404).send({ 'message': 'Not Found - the url entered does not match any content' });
}

//Controller function that handles all the invalid method errors.
exports.handlesInvalidMethod = (req, res, next) => {
    res.status(405).send({ 'message' : 'Method not allowed'})
}



