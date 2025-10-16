import Joi from "joi";


export const taskvalidation = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    order_index: Joi.number().required(),
    description: Joi.string().min(10).max(50).required(),
    user_id: Joi.string().required(),
    board_id: Joi.string().required(),
    column_id: Joi.string().required()
})



export const taskValidationUpdate = Joi.object({
    title: Joi.string().min(2).max(50),
    order_index: Joi.number(),
    description: Joi.string().min(10).max(50),
    user_id: Joi.string(),
    board_id: Joi.string(),
    column_id: Joi.string()
})