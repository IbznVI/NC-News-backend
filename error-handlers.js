exports.apiErrorHandler = (req,res) => {
    res.status(404).send({ msg: "Not found: API not found"});
};

exports.serverErrorHandler = (err, res, req, next) => {
    console.log(err);
    response(status(500).send({ msg: "Internal Server Error "}));
};