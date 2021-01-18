const { fetchUserByUsername } = require('../models/users.models.js')

exports.getUserByUsername = (req, res, next) => {
    const { username } = req.params;
    fetchUserByUsername(username).then((user) => {
        if(!user) {
            return Promise.reject({ 'status' : 404, 'msg': 'The username entered does not exist in the database' });
        }
        res.send({ user });
    }).catch(next);
}