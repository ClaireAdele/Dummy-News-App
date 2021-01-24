const connection = require('../../connection.js');

//Gets a user corresponding to the username on the request.
//If the username does not correspond to a username in the database, sends back 404 Not Found.
exports.fetchUserByUsername = (username) => {
        return connection
            .select('*')
            .from('users')
            .where('username', '=', username)
            .then(([user]) => {
                if (user) {
                    return user;
                } else {
                    return Promise.reject({ 'status': 404, 'msg': 'The username entered does not exist in the database' });
                }
            });
}

