const {articleFromId, allArticles, patchArticleVote} = require("../models/articles-models");

exports.getArticleFromId = (req,res,next) => {
    const { article_id } = req.params
    articleFromId(article_id).then((article) => {
        res.status(200).send({ article })
    })
    .catch((err) => {
        next(err)
    });
};

exports.getArticles = (req, res, next) => {
    const {sort_by = "created_at", order = "DESC"} = req.query
    allArticles(sort_by, order).then((articles)=>{
        res.status(200).send({ articles })
    });
};

exports.patchVoteArticle = (req,res,next) => {
    const { body } = req
    const { article_id } = req.params 
    patchArticleVote(body, article_id)
    .then((article) => {
        res.status(200).send({ article })
    })
    .catch((err)=>{
        next(err)
    });
};
