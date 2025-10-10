import pool from "../config/database.js";
import { deletefromtable, GetAll } from "../helpers/utils.js";
import { getAll } from "./User.controller.js";

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
            const tablename = "columns"
            const respond = await GetOnefromtable(tablename, id)
            return respond
        } catch (err) {
            throw new Error(err)
        }
    },
    post: async function (req, res) {
        try {
            const { title, order, user_id } = req.body
            const query = `INSERT INTO columns(title,"order",user_id) VALUES($1,$2,$3) RETURNING*`
            const { rows } = await pool.query(query, [title, order, user_id])
            return res.status(200).send(rows)
        } catch (err) {
            throw new Error(err)
        }
    },
    put: async function (req, res) {
        try {
            const id = req.params.id
            const all = await getAll("columns")
            const columnIndex = findIndex(column => column.id === id)
            if (columnIndex === 1) return res.status(404).send({ message: `${id} not found` })
            const keys = Object.keys(req.body)
            const values = Object.values(req.body)
            let setquery = keys.map((key, i) => `${key}=$${i + 1}`).join(",")
            const query = `UPDATE columns SET ${setquery} WHERE id=$${keys.length + 1} RETURNING*`
            const { rows } = await pool.query(query, [...values, id])
            return res.status(200).send({ message: `${id} column updated successfully` })
        } catch (err) {
            throw new Error(err)
        }
    },
    delete: async function (req, res) {
        try {
            const id = req.params.id
            const tablename = "columns"
            const respond = await deletefromtable(tablename, id)
            return respond
        } catch (err) {
            throw new Error(err)
        }
    }
}