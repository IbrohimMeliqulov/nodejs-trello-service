import pool from "../config/database.js";
import { GetAll, GetOnefromtable } from "../helpers/utils.js";



export const TaskController={
    getAlltasks:async function(req,res){
        try{
            const all=await GetAll("tasks")
            return res.status(200).send(all)
        }catch(err){
            throw new Error(err)
        }
    },
    getOneTask:async function(req,res){
        try{
            const id=req.params.id
            const tablename="tasks"
            const respond=await GetOnefromtable(tablename,id)
            return respond
        }catch(err){
            throw new Error(err)
        }
    },
    post:async function(req,res){
        try{
            const 
        }catch(err){
            throw new Error(err)
        }
    },
    put:async function(req,res){
        try{

        }catch(err){
            throw new Error(err)
        }
    },
    delete:async function(req,res){
        try{

        }catch(err){
            throw new Error(err)
        }
    }
}