const express = require("express");
const { getTopics } = require("./controllers/topics-controllers");
const { getEndpoints } = require("./controllers/endpoint-controllers")
const { getArticleFromId, getArticles} = require("./controllers/articles-controllers")
const app = express();
const { endpointErrorHandler, serverErrorHandler, psqlErrorHandler } = require("./error-handlers")


app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);
app.get("/api/articles/:article_id", getArticleFromId);
app.get("/api/articles", getArticles)

app.all("*", endpointErrorHandler);

app.use(psqlErrorHandler);
app.use(serverErrorHandler);


module.exports = app;