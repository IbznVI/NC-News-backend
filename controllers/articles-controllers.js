const {articleFromId} = require("../models/articles-models");

exports.getArticleFromId = (req,res,next) => {
    const { article_id } = req.params
    articleFromId(article_id).then((article) => {
        res.status(200).send({ article })
    })
    .catch((err) => {
        next(err)
    });
};