import pool from "../config/database.js";
import {  DeleteFromtable, GetAll, GetOne, Updatetable } from "../helpers/utils.js";

export const ColumnController = {
    getAllColumns: async function (req, res) {
        try {
            const result = await GetAll("columns")
            return res.status(200).send(result)
        } catch (err) {
            throw new Error(err)
        }
    },
    getOneColumn: async function (req, res) {
        try {
            const id = req.params.id
            const tablename="columns"
            const result=await GetOne(tablename,id,res)
            return result
        } catch (err) {
            throw new Error(err)
        }
    },
    post: async function (req, res) {
        try {
            const { title, order_index, board_id } = req.body
            const query = `INSERT INTO columns(title,order_index,board_id) VALUES($1,$2,$3) RETURNING*`
            const { rows } = await pool.query(query, [title, order_index,board_id])
            return res.status(200).send(rows)
        } catch (err) {
            throw new Error(err)
        }
    },
    put: async function (req, res) {
        try {
            const id = req.params.id
            const result=await Updatetable("columns",id,req,res)
            return result
        } catch (err) {
            throw new Error(err)
        }
    },
    delete: async function (req, res) {
        try {
            const id = req.params.id
            const tablename="columns"
            const result=await DeleteFromtable(tablename,id,res)
            console.log(id)
            return result
        } catch (err) {
            throw new Error(err)
        }
    }
}