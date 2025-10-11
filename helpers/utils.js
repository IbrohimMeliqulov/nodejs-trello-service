import pool from "../config/database.js";
export async function GetAll(tablename){
    try{
        const query=`SELECT * FROM ${tablename}`
        const {rows}=await pool.query(query)
        return rows
    }catch(err){
        throw new Error(err)
    }
}


export const GetOne=async (tablename,id,res)=>{
    try{
        const all=await GetAll(tablename)
        const Index=all.findIndex(index=>index.id===id)
        if(Index===-1) return res.status(404).send({message:`${id} not found`})
        const query=`SELECT * FROM ${tablename} WHERE id=$1`
        const {rows}=await pool.query(query,[id])
        return res.status(200).send({
            message:rows[0]
        })
    }catch(err){
        throw new Error(err)
    }
}


export const DeleteFromtable=async(tablename,id,res)=>{
    try{
        const all=await GetAll(tablename)
        console.log(id)
        const Index=all.findIndex(index=>index.id===id)
        if(Index===-1) return res.status(404).send({message:`${id} not found`})
        const query=`DELETE FROM ${tablename} WHERE id=$1`
        const {rows}=await pool.query(query,[id])
        return res.status(200).send({
            message:`${id} deleted from table`,
            data:rows[0]
        })
    }catch(err){
        throw new Error(err)
    }
}


export const Updatetable=async(tablename,id,req,res)=>{
    try{
        const all=await GetAll(tablename)
        const Index=all.findIndex(index=>index.id===id)
        if(Index===-1) return res.status(404).send({message:`${id} not found`})
        const keys=Object.keys(req.body)
        const values=Object.values(req.body)
        let setquery=keys.map((key,i)=>`${key}=$${i+1}`).join(",")
        const query=`UPDATE ${tablename} SET ${setquery} WHERE id=$${keys.length+1}  RETURNING*`
        const {rows}=await pool.query(query,[...values,id])
        return res.status(200).send({
            message:rows[0]
        })
    }catch(err){
        throw new Error(err)
    }
}

