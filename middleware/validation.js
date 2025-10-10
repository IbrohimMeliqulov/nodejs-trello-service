import Joi from "joi";



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

// 3bfd82d8-b566-4a20-a236-6342f23bdca9
export const RegisterUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required()
})


export const UpdateUservalidation = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(3).max(10)
})

export const boardValidation=Joi.object({
    title:Joi.string().max(25).required(),
    user_id:Joi.string().max(36).required()
})


export const boardUpdatevalidation=Joi.object({
    title:Joi.string().max(25),
    user_id:Joi.string().max(36)
})