const db = require("../db/connection.js")
const format = require("pg-format")

exports.articleFromId = (article_id) => {
    return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "Not found" });
            }
            return rows[0]
        });
};

exports.allArticles = (sort_by, order)=>{
    const parametricQuery = format("SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.%I %s;", sort_by, order)
    return db.query(parametricQuery).then(({rows})=>{
        return rows;
    })
}

exports.patchArticleVote = (body, id) =>{
    const patchVote = Object.values(body)[0]
    return db.query("UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *", [patchVote, id])
    .then(({rows})=>{
        return rows[0]
    })
}
