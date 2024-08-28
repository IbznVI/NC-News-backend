const { commentsFromArticle } = require("../models/comments-models")
const { articleFromId } = require("../models/articles-models")

exports.getArticleComments = (req, res, next) => {
    const { article_id } = req.params;
    articleFromId(article_id)
    .then(() => {
        return commentsFromArticle(article_id)
    }).then((comments) => {
        res.status(200).send({ comments })
    })
    .catch((err)=>{
        next(err)
    })
}

