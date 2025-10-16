import Joi from "joi";



export const boardValidation = Joi.object({
    title: Joi.string().max(25).required(),
    user_id: Joi.string().max(36).required()
})


export const boardUpdatevalidation = Joi.object({
    title: Joi.string().max(25),
    user_id: Joi.string().max(36)
})
