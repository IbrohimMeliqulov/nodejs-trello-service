import Joi from "joi";



export const columnsvalidation = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    order_index: Joi.number().required(),
    board_id: Joi.string().required()
})

export const columnsValidationupdate = Joi.object({
    title: Joi.string().min(2).max(50),
    order_index: Joi.number(),
    board_id: Joi.string()
})
