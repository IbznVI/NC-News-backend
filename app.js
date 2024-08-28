const express = require("express");
const app = express();
app.use(express.json());

const { getTopics } = require("./controllers/topics-controllers");
const { getEndpoints } = require("./controllers/endpoint-controllers")
const { getArticleFromId, getArticles, patchVoteArticle} = require("./controllers/articles-controllers")
const { endpointErrorHandler, serverErrorHandler, psqlErrorHandler } = require("./error-handlers")
const { getArticleComments, postCommentOnArticle } = require("./controllers/comments-controllers")

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);
app.get("/api/articles/:article_id", getArticleFromId);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postCommentOnArticle);

app.patch("/api/articles/:article_id", patchVoteArticle);

app.all("*", endpointErrorHandler);

app.use(psqlErrorHandler);
app.use(serverErrorHandler);

module.exports = app;