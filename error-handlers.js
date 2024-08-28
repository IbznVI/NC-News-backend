exports.endpointErrorHandler = (req, res) => {
    res.status(404).send({ msg: "Not found" });
};

exports.serverErrorHandler = (err, req, res, next) => {
    console.error(err, "error details")
    const { status = 500, msg = "Internal Server Error" } = err
    res.status(status).send({ msg })
};

exports.psqlErrorHandler = (err, req, res, next) => {
    if (err.code === "22P02" || err.code === "23502"){
        res.status(400).send({ msg: "Bad Request"})
    } else {
        next(err)
    };
};