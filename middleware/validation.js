import Joi from "joi";


export 


export function RegisterUser(data){
    const Registerschema=Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(3).max(10).required()
    })
    return Registerschema.validate(data,{abortEarly:true})
}


export function UpdateUservalidation(data){
    const updateSchema=Joi.object({
        name:Joi.string(),
        email:Joi.string().email(),
        password:Joi.string().min(3).max(10)
    })
    return updateSchema.validate(data)
}

