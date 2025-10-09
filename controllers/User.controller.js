import pool from "../config/database.js";
import * as bcrypt from "bcrypt"
import { RegisterUser,UpdateUservalidation } from "../middleware/validation.js";


const setup =async (req,res,next)=>{
    try{

    }catch(err){
        return next(err)
    }
}

const register=async(req,res,next)=>{
    try{
        const {error,value}=RegisterUser(req.body)
        if(error) return res.status(422).send(error.details[0].message)
        // const all=(await pool.query(`SELECT * FROM users`)).rows
        // const foundedUser=all.findIndex(user=>user.email===email)
        // if(foundedUser!==-1) return res.status(404).send({message:`This email exists. You registered before`})
        const {name,email,password}=value
        const hashPassword=await bcrypt.hash(password,10)
        const {rows}=await pool.query(`INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING*`,[name,email,hashPassword])
        return res.status(200).send({
            success:true,
            message:`Registered successsfully`,
            data:rows[0]
        })
    }catch(err){
        return next(err)
    }
}


const login=async(req,res,next)=>{
    try{
        const {email,password}=req.body
        const {rows}=await pool.query(`SELECT * FROM users WHERE email=$1`,[email])
        const user=rows[0]
        if(!user) return res.status(404).send({message:`Not found,Please register`})
        const passwordmatch=await bcrypt.compare(password,user.password)
        if(!passwordmatch) return res.status(400).send({message:`Password doesn't match`})
        return res.status(200).send({message:`Logged in successfully`})
    }catch(err){
        return next(err)
    }
}


const getAll=async(req,res,next)=>{
    try{
        const query=`SELECT * FROM users`
        const {rows}=await pool.query(query)
        return res.status(200).send(rows)
    }catch(err){
        return next(err)
    }
}



const getOne=async(req,res,next)=>{
    try{
        const id=req.params.id
        const all=(await pool.query(`SELECT * FROM users`,)).rows
        const userIndex=all.findIndex(user=>user.id===+id)
        if(userIndex===-1) return res.status(400).send({message:`${id} not found`})
        const user=all[userIndex]
        return res.status(200).send(user)
    }catch(err){
        return next(err)
    }
}

const update=async(req,res,next)=>{
    try{
        const id=req.params.id
        const all=(await pool.query(`SELECT * FROM users`,)).rows
        const userIndex=all.findIndex(user=>user.id===+id)
        if(userIndex===-1) return res.status(400).send({message:`${id} not found`})
        const {error,value}=UpdateUservalidation(req.body)
        if(error) return res.status(422).send(error.details[0].message)
        const keys=Object.keys(req.body)
        const values=Object.values(req.body)
        let Setquery=keys.map((key,i)=>`${key}=$${i+1}`).join(",")
        const query=`UPDATE users SET ${Setquery} WHERE id=$${keys.length+1} RETURNING*`
        const {rows}=await pool.query(query,[...values,id])
        return res.status(200).send({message:`${id} user updated successfully`})
    }catch(err){
        return next(err)
    }
}


const deleteUser=async(req,res,next)=>{
    try{
        const id=req.params.id
        const user=await pool.query(`SELECT * FROM users  WHERE id=$1`,[id])
        if(!user) return res.status(400).send({message:`${id} user not found`})
        const query=`DELETE FROM users WHERE id=$1`
        const {rows}=await pool.query(query,[id])
        return res.status(200).send({message:`${id} user deleted from table`})
    }catch(err){
        return next(err)
    }
}


export {deleteUser,getAll,getOne,update,setup,login,register}