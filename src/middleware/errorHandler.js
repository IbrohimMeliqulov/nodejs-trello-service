const ErrorHandler = (err, req, res, next) => {
    console.error(err)
    const status = err.status || 500
    let message = "Internal Server Error"
    if (status === 404) message = "Not found"
    if (status === 400) message = "Bad request"
    return res.status(status).send({
        success: false,
        message: err.message || err.detail || err.hint || "Internal Server Error"
    })
}

export default ErrorHandler