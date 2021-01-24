const connection = require('../../connection.js');

//Gets all the topics from the database.
exports.selectAllTopics = () => {
    return connection
        .select('*')
        .from('topics')
        .returning('*')
        .then((topics) => {
            return topics
        })
}
