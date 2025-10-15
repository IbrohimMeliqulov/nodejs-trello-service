import pool from "../config/database.js";
import { Maincontroller } from "../helpers/utils.js";

export const BoardController = {
    post: async function (req, res, next) {
        try {
            const { title, user_id } = req.body
            const one = await pool.query(`SELECT * FROM users WHERE id=$1`, [user_id])
            if (one.rows.length === 0) return res.status(404).send({ message: `${user_id} user not found` })
            const values = [title, user_id]
            const query = `INSERT INTO boards(title,user_id) VALUES($1,$2) RETURNING*`
            const { rows } = await pool.query(query, values)
            return res.status(200).send(rows)
        } catch (err) {
            return next(err)
        }
    },
    getAll: async function (req, res, next) {
        try {
            const result = await Maincontroller.pagination(req, res, next, "boards")
            return result
        } catch (err) {
            return next(err)
        }
    },
    getOne: async function (req, res, next) {
        try {
            const id = req.params.id
            const result = await Maincontroller.Findone(res, "boards", id, next)
            return result
        } catch (err) {
            return next(err)
        }
    },
    update: async function (req, res, next) {
        try {
            const id = req.params.id
            const result = await Maincontroller.Update(req, res, "boards", id)
            return result
        } catch (err) {
            return next(err)
        }
    },
    delete: async function (req, res, next) {
        try {
            const id = req.params.id
            const result = await Maincontroller.Delete(res, "boards", id, next)
            return result
        } catch (err) {
            return next(err)
        }
    }
}