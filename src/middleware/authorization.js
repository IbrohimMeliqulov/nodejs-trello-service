import jwt from "jsonwebtoken";


export function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    if(token==null) return res.status(401).send({message:"Null token"})
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.status(403).send({message:err.message})
        req.user=user
        next(err)
    })
}
