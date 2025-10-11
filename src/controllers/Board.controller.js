import pool from "../config/database.js";
import {  DeleteFromtable, GetOne, pagination, Updatetable } from "../helpers/utils.js";

export const BoardController={
    post:async function(req,res){
        try{
            const{title,user_id}=req.body
            const values=[title,user_id]
            const query=`INSERT INTO boards(title,user_id) VALUES($1,$2) RETURNING*`
            const {rows}=await pool.query(query,values)
            return res.status(200).send(rows)
        }catch(err){
            throw new Error(err)
        }
    },
    getAll:async function(req,res){
        try{
            const result=await pagination("boards",req,res)
            return result
        }catch(err){
            throw new Error(err)
        }
    },
    getOne:async function(req,res){
        try{    
            const id=req.params.id
            const tablename="boards"
            const result=await GetOne(tablename,id,res)
            return result
        }catch(err){
            throw new Error(err)
        }
    },
    update:async function (req,res){
        try{
            const id=req.params.id
            const result=await Updatetable("boards",id,req,res)
            return result
        }catch(err){
            throw new Error(err)
        }
    },
    delete:async function(req,res){
        try{
            const id=req.params.id
            const result=await DeleteFromtable("boards",id,res) 
            return result
        }catch(err){
            throw new Error(err)
        }
    }
}