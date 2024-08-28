const db = require("../db/connection")

exports.commentsFromArticle = (article_id) => {
    return db.query("SELECT * FROM comments WHERE article_id = $1 ORDER BY comments.created_at DESC", [article_id])
    .then(({rows})=>{
        return rows
    });
};

exports.postingComment = (username, body, article_id) => {
    return db
    .query(`INSERT INTO comments (body, article_id, author) VALUES ($1, $2, $3) RETURNING *`, [body, article_id, username])
    .then(({rows})=>{
        return rows[0];
    });
};

