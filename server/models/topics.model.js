const connection = require('../../connection.js');

exports.selectAllTopics = () => {
    return connection
        .select('*')
        .from('topics')
        .returning('*')
}
