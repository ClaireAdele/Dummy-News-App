exports.handlePSQLErrors = (err, req, res, next) => {
    if (res.code === '23502' || res.code === '42703') {
        res.status(400).send({ 'message': err.message.split('-')[1] });
    } else next(err)
}

exports.handlesInvalidInput = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
}

exports.handlesInvalidPath = (req, res, next) => {
    res.status(404).send({ 'message': 'Not Found - the url entered does not match any content' });
    next(err);
}
