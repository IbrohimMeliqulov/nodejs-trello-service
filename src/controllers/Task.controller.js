import pool from "../config/database.js";
import { DeleteFromtable, GetOne, pagination, Updatetable } from "../helpers/utils.js";



export const TaskController={
    getAlltasks:async function(req,res){
        try{
            const result=await pagination("tasks",req,res)
            return result
        }catch(err){
            throw new Error(err)
        }
    },
    getOneTask:async function(req,res){
        try{
            const id=req.params.id
            const result=await GetOne("tasks",id,res)
            return result
        }catch(err){
            throw new Error(err)
        }
    },
    post:async function(req,res){
        try{
            const {title,order_index,description,user_id,board_id,column_id}=req.body
            const query=`INSERT INTO tasks(title,order_index,description,user_id,board_id,column_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING*`
            const {rows}=await pool.query(query,[title,order_index,description,user_id,board_id,column_id])
            return res.status(200).send({
                message:rows[0]
            })
        }catch(err){
            throw new Error(err)
        }
    },
    update:async function(req,res){
        try{
            const id=req.params.id
            const result=await Updatetable("tasks",id,req,res)
            return result
        }catch(err){
            throw new Error(err)
        }
    },
    delete:async function(req,res){
        try{
            const id=req.params.id
            const result=await DeleteFromtable("tasks",id,res)
            return result
        }catch(err){
            throw new Error(err)
        }
    }
}