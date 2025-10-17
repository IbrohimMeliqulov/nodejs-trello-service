import pool from "../config/database.js";
import { slugify } from "../helpers/slugify.js";
import { Maincontroller } from "../helpers/utils.js";

export const BoardController = {
    post: async function (req, res, next) {
        try {
            const { title, user_id } = req.body
            const slug=slugify(title)
            const search=await pool.query(`SELECT * FROM boards WHERE LOWER(title)=$1`,[title.toLowerCase()])
            // console.log(search)
            const user=await pool.query(`SELECT * FROM users WHERE id=$1`,[user_id])
            if(user.rows.length===0) return res.status(404).send({message:`${user_id} user not found`})
            if(search.rows.length>0) return res.status(404).send({message:`This title ${title} already exists`})
            const one = await pool.query(`SELECT * FROM users WHERE id=$1`, [user_id])
            if (one.rows.length === 0) return res.status(404).send({ message: `${user_id} user not found` })
            const values = [title, slug,user_id]
            const query = `INSERT INTO boards(title,slug,user_id) VALUES($1,$2,$3) RETURNING*`
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
            const result = await Maincontroller.findone(res, "boards", id, next)
            return result
        } catch (err) {
            return next(err)
        }
    },
    update: async function (req, res, next) {
        try {
            const{title}=req.body
            const one=await pool.query(`SELECT * FROM boards WHERE LOWER(title)=$1`,[title.toLowerCase()])
            if(one.rows.length>0) return res.status(400).send({message:`${title} already exists`})
            const result = await Maincontroller.update(req, res, "boards", next)
            return result
        } catch (err) {
            return next(err)
        }
    },
    delete: async function (req, res, next) {
        try {
            const id = req.params.id
            const result = await Maincontroller.delete(res, "boards", id, next)
            return result
        } catch (err) {
            return next(err)
        }
    }
}