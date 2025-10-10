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

