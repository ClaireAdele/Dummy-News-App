const connection = require('../../connection.js');

exports.fetchUserByUsername = (username) => {
    return connection
    .select('*')
    .from('users')
    .where('username', '=', username)
    .then(([user]) => {
        return user;
    })
}

