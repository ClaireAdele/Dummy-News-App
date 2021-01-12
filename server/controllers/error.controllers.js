exports.handlePSQLErrors = (err, req, res, next) => {
    if(res.code === '23502' || res.code === '42703') {
        res.status(400).send({'message' : err.message.split('-')[1]});
    } else next(err)
}

exports.handlesInvalidPath = (req, res, next) => {
    res.status(404).send({'message' : 'Not Found'});
}
