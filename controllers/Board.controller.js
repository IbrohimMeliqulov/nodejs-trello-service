import pool from "../config/database.js";
import {  GetAll } from "../helpers/utils.js";

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
            const result=await GetAll("boards")
            return res.status(200).send(result) 
        }catch(err){
            throw new Error(err)
        }
    },
    getOne:async function(req,res){
        try{    
            const id=req.params.id
            const all=await GetAll("boards")
            const boardIndex=all.findIndex(board=>board.id===id)
            if(boardIndex===-1) return res.status(404).send({message:`${id} not found`})
            const query=`SELECT * FROM boards WHERE id=$1`
            const {rows}=await pool.query(query,[id])
            return res.status(200).send(rows)
        }catch(err){
            throw new Error(err)
        }
    },
    put:async function (req,res){
        try{
            const id=req.params.id
            const result=await GetAll('boards')
            const boardIndex=result.findIndex(board=>board.id===id)
            if(boardIndex===-1) return res.status(400).send({message:`${id} not found`})
            const keys=Object.keys(req.body)
            const values=Object.values(req.body)
            let setquery=keys.map((key,i)=>`${key}=$${i+1}`).join(",")
            const query=`UPDATE boards SET ${setquery} WHERE id=$${keys.length+1} RETURNING *`
            const {rows}=await pool.query(query,[...values,id])
            return res.status(200).send({message:`${rows}`})
        }catch(err){
            throw new Error(err)
        }
    },
    delete:async function(req,res){
        try{
            const id=req.params.id
            const all=await GetAll("boards") 
            const boardIndex=all.findIndex(board=>board.id===id)
            if(boardIndex===-1) return res.status(404).send({message:`${id} not found`})
            const query=`DELETE FROM boards WHERE id=$1`
            const {rows}=await pool.query(query,[id])
            return res.status(200).send({message:`${id} deleted from table`})
        }catch(err){
            throw new Error(err)
        }
    }
}