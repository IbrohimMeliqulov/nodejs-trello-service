import pool from "../config/database.js";
import * as bcrypt from "bcrypt";
import { Maincontroller } from "../helpers/utils.js";




const setup = async (req, res, next) => {
    try {
        const { query } = req.body
        const result = await pool.query(query)
        return res.status(200).send({
            message: result.command
        })
    } catch (err) {
        return next(err)
    }
}

const deletetable = async (req, res, next) => {
    try {
        const { query } = req.body
        const result = await pool.query(query)
        return res.status(200).send({
            message: result.command
        })
    } catch (err) {
        return next(err)
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const { rows } = await pool.query(`INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id,name,email`, [name, email, hashPassword])
        return res.status(200).send({
            success: true,
            message: `Registered successsfully`,
            data: rows[0]
        })
    } catch (err) {
        return next(err)
    }
}


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const { rows } = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
        const user = rows[0]
        if (!user) return res.status(404).send({ message: `Not found,Please register` })
        const passwordmatch = await bcrypt.compare(password, user.password)
        if (!passwordmatch) return res.status(400).send({ message: `Password doesn't match` })
        return res.status(200).send({ message: `Logged in successfully` })
    } catch (err) {
        return next(err)
    }
}


const getAll = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, filter, value } = req.query
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber
        if (filter && value) {
            const query = `SELECT id,name,email FROM users WHERE ${filter} ILIKE $1 LIMIT $2 OFFSET $3`
            const { rows } = await pool.query(query, [`%${value}%`, limitNumber, offset])
            return res.status(200).send({
                page: pageNumber,
                limit: offset,
                total: rows.length,
                data: rows
            })
        } else {
            const query = `SELECT id,name,email FROM users LIMIT $1 OFFSET $2`
            const { rows } = await pool.query(query, [limitNumber, offset])
            return res.status(200).send({
                page: pageNumber,
                limit: offset,
                total: rows.length,
                data: rows
            })
        }
    } catch (err) {
        return next(err)
    }
}


const getOne = async (req, res, next) => {
    try {
        const id = req.params.id
        const { rows } = await pool.query(`SELECT id,name,email FROM users WHERE id=$1`, [id])
        if (!rows) return res.status(404).send({ message: `${id} not found` })
        return res.status(200).send({
            message: `${id} found`,
            data: rows[0]
        })
    } catch (err) {
        return next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        const one = await pool.query(`SELECT * FROM users WHERE id=$1`, [id])
        if (!one) return res.status(404).send({ message: `${id} not found` })
        const keys = Object.keys(req.body)
        const values = Object.values(req.body)
        let setquery = keys.map((key, i) => `${key}=$${i + 1}`).join(",")
        const index = keys.findIndex(key => key === "password")
        const password = values[index]
        const hashPassword = await bcrypt.hash(password, 10)
        values[index] = hashPassword
        const query = `UPDATE users SET ${setquery} WHERE id=$${keys.length + 1} RETURNING id,name,email,password`
        const { rows } = await pool.query(query, [...values, id])
        return res.status(201).send({
            message: `Successfully updated`,
            data: rows[0]
        })
    } catch (err) {
        return next(err)
    }
}


const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await Maincontroller.Delete(res, "users", id, next)
    } catch (err) {
        return next(err)
    }
}


export { deleteUser, getAll, getOne, update, setup, login, register, deletetable }