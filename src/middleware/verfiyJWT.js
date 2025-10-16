import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"




export function jwtTokens(user){
    const accessToken=jwt.sign({
        email:user.email,
        password:user.password},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10m'})
    
    
    const refreshToken=jwt.sign({
        email:user.email,
        password:user.password},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'})
    return ({accessToken,refreshToken})
} 