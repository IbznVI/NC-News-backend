const express = require("express");
const { getTopics } = require("./controllers/topics-controllers");
const app = express();
const { apiErrorHandler, serverErrorHandler } = require("./error-handlers")

app.use(express.json());

app.get("/api/topics", getTopics);

app.use(apiErrorHandler);
app.use(serverErrorHandler);


module.exports = app;