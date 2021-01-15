const { fetchUserByUsername } = require('../models/users.models.js')

exports.getUserByUsername = (req, res, next) => {
    const { username } = req.params;
    fetchUserByUsername(username).then((user) => {
        res.send({ user });
    }).catch(next);
}