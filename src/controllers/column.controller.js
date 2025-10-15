import pool from "../config/database.js";
import { Maincontroller } from "../helpers/utils.js";

export const ColumnController = {
    getAllColumns: async function (req, res, next) {
        try {
            const result = await Maincontroller.pagination(req, res, next, "columns")
            return result
        } catch (err) {
            return next(err)
        }
    },
    getOneColumn: async function (req, res, next) {
        try {
            const id = req.params.id
            const result = await Maincontroller.Findone(res, "columns", id, next)
            return result
        } catch (err) {
            return next(err)
        }
    },
    post: async function (req, res, next) {
        try {
            const { title, order_index, board_id } = req.body
            const query = `INSERT INTO columns(title,order_index,board_id) VALUES($1,$2,$3) RETURNING*`
            const { rows } = await pool.query(query, [title, order_index, board_id])
            return res.status(200).send(rows)
        } catch (err) {
            return next(err)
        }
    },
    update: async function (req, res, next) {
        try {
            const id = req.params.id
            const result = await Maincontroller.Update(req, res, id, next)
            return result
        } catch (err) {
            return next(err)
        }
    },
    delete: async function (req, res) {
        try {
            const id = req.params.id
            const result = await Maincontroller.Delete(res, "columns", id, next)
            return result
        } catch (err) {
            return next(err)
        }
    }
}