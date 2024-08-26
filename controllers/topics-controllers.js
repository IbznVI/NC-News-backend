const { allTopics } = require("../models/topics-models");

const getTopics = (req,res, next) => {
    allTopics().then((topics)=>{
        res.status(200).send({ topics });
    });
};

module.exports = { getTopics };