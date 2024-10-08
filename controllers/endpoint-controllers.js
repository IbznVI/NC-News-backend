const {allEndpoints} = require("../models/endpoint-models");

exports.getEndpoints = (req,res,next)=>{
    allEndpoints().then((endpoints)=>{
        res.status(200).send({ endpoints })
    })
    .catch((err)=>{
        next(err)
    });
};
