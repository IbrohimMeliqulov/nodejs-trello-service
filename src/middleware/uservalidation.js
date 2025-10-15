import Joi from "joi"




export const RegisterUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(25).required()
})


export const UpdateUservalidation = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(25)
})