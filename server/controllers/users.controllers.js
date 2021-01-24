const { fetchUserByUsername } = require('../models/users.models.js')

//Gets a user corresponding to the username on the request.
//If the username does not correspond to a username in the database, sends back 404 Not Found.
exports.getUserByUsername = (req, res, next) => {
    const { username } = req.params;
    fetchUserByUsername(username).then((user) => {
        res.send({ user });
    }).catch(next);
}