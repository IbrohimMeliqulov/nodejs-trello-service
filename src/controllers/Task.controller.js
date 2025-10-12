import pool from "../config/database.js";
import { DeleteFromtable, GetAll, GetOne, pagination, Updatetable } from "../helpers/utils.js";



export const TaskController={
    getAlltasks:async function(req,res){
        try{
            const {boardId}=req.params
            const {page=1,limit=10}=req.query
            const pageNumber=Number(page)
            const limitNumber=Number(limit)
            const offset=(pageNumber-1)*limitNumber
            const query=`SELECT * FROM tasks WHERE board_id=$1 LIMIT $2 OFFSET $3`
            const {rows}=await pool.query(query,[boardId,limitNumber,offset])
            if(!rows) return res.status(404).send({message:`There are not any tasks related to this board ${boardId} `})
            return res.status(200).send({
                page:pageNumber,
                limit:offset,
                total:rows.length,
                data:rows
            })
        }catch(err){
            throw new Error(err)
        }
    },
    getOneTask:async function(req,res){
        try{
            const{id,boardId}=req.params
            const query=`SELECT * FROM tasks WHERE id=$1 and board_id=$2`
            const {rows}=await pool.query(query,[id,boardId])
            return res.status(200).send(rows)
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
            const{boardId,id}=req.params
            const result=await pool.query("SELECT * FROM tasks WHERE board_id=$1 and id=$2",[boardId,id])
            if(!result) return res.status(404).send({message:`There is not any task with id on this board`})
            const keys=Object.keys(req.body)
            const values=Object.values(req.body)
            let setquery=keys.map((key,i)=>`${key}=$${i+1}`).join(",")
            const query=`UPDATE tasks SET ${setquery} WHERE id=$${keys.length+1} RETURNING*`
            const {rows}=await pool.query(query,[...values,id])
            return res.status(200).send(rows)
        }catch(err){
            throw new Error(err)
        }
    },
    delete:async function(req,res){
        try{
            const{boardId,id}=req.params
            const result=await pool.query("SELECT * FROM tasks WHERE board_id=$1 and id=$2",[boardId,id])
            if(!result) return res.status(404).send({message:`There is not any task with id on this board`})
            const query=`DELETE FROM tasks WHERE board_id=$1 and id=$2 RETURNING*`
            const {rows}=await pool.query(query,[boardId,id])
            return res.status(404).send({
                message:`${id} task deleted from table`,
                data:rows
            })
        }catch(err){
            throw new Error(err)
        }
    }
}