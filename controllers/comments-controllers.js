const { commentsFromArticle, postingComment} = require("../models/comments-models")
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

exports.postCommentOnArticle = (req,res,next)=>{
    const { username, body } = req.body;
    const { article_id } = req.params;
    postingComment(username, body, article_id)
    .then((comment)=>{
        res.status(201).send({comment})
    })
    .catch((err)=>{
        next(err)
    })
}