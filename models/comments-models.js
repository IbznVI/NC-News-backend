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


exports.deleteComment = (comment_id) => {
    return db.query("DELETE FROM comments WHERE comment_id = $1 RETURNING *", [comment_id])
    .then(({rows})=>{
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "Not found"})
        }
    })
}