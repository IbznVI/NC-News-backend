const db = require("../db/connection");

const allTopics = () => {
    return db.query("SELECT * FROM topics").then(({ rows }) => {
        return rows
    });
};

module.exports = { allTopics };