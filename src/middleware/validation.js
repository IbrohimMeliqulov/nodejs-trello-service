

export const validationfactory = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body)
    if (error) {
        const errors = error.details.map((err) => ({
            field: err.path.join(','),
            message: err.message
        }))
        return res.status(422).json({ errors })
    }
    next()
}
