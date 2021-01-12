const connection = require('../../connection.js');

exports.fetchUserByUsername = (username) => {
    return connection
    .select('*')
    .from('users')
    .where('username', '=', username)
    .then((user) => {
        return user;
    })
}

// GET /api/users/:username
// Responds with
// a user object which should have the following properties:
// username
// avatar_url
// name