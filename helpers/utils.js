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

export async function deletefromtable(tablename,id){
    try{
        const all=await GetAll(tablename)
        const Index=all.findIndex(index=>index.id===id)
        if(Index===-1) return resizeBy.status(404).send({message:`${id} not found`})
        const query=`DELETE FROM ${tablename} WHERE id=${id}`
        const {rows}=await pool.query(query)
        return res.status(200).send({message:`${id} deleted from table`})
    }catch(err){
        throw new Error(err)
    }
}

export async function GetOnefromtable(tablename,id){
    try{
        const Index = all.findIndex(index => index.id === id)
        if (Index === -1) return res.status(404).send({ message: `${id} not found` })
        const query = `SELECT * FROM ${tablename} WHERE id=${id}`
        const { rows } = await pool.query(query)
        return res.status(200).send(rows)
    }catch(err){
        throw new Error(err)
    }
}