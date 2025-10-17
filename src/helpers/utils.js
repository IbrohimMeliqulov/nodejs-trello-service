import pool from "../config/database.js";
import format from "pg-format"



export const Maincontroller = {
    pagination: async function (req, res, next, tablename) {
        try {
            const { page = 1, limit = 10, filter, value } = req.query
            const pageNumber = Number(page)
            const limitNumber = Number(limit)
            const offset = (pageNumber - 1) * limitNumber
            if (filter && value) {
                const query = `SELECT * FROM ${tablename} WHERE ${filter} ILIKE $1 LIMIT $2 OFFSET $3`
                const { rows } = await pool.query(query, [`%${value}%`, limitNumber, offset])
                return res.status(200).send({
                    page: pageNumber,
                    limit: offset,
                    total: rows.length,
                    data: rows
                })
            } else {
                const query = `SELECT * FROM ${tablename} LIMIT $1 OFFSET $2`
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
    },
    findone: async function (res, tablename, id, next) {
        try {
            const query = format(`SELECT * FROM %I WHERE id=$1`, [tablename])
            const {rows}=await pool.query(query,[id])
            if (rows.length === 0) return res.status(404).send({ message: `${id} not found` })
            return res.status(200).send({
                message: `${id} found`,
                data: rows[0]
            })
        } catch (err) {
            return next(err)
        }
    },
    update: async function (req, res, tablename, next) {
        try {
            const id = req.params.id
            console.log(req.params)
            const one = await pool.query(`SELECT * FROM ${tablename} WHERE id=$1`, [id])
            if (one.rows.length === 0) return res.status(404).send({ message: `${id} not found` })
            const keys = Object.keys(req.body)
            const values = Object.values(req.body)
            let setquery = keys.map((key, i) => `${key}=$${i + 1}`).join(",")
            const query = `UPDATE ${tablename} SET ${setquery} WHERE id=$${keys.length + 1} RETURNING*`
            const { rows } = await pool.query(query, [...values, id])
            return res.status(201).send({
                message: `Successfully updated`,
                data: rows[0]
            })
        } catch (err) {
            return next(err)
        }
    },
    delete: async function (res, tablename, id, next) {
        try {
            const one = await pool.query(`SELECT * FROM ${tablename} WHERE id=$1`, [id])
            if (one.rows.length === 0) return res.status(404).send({ message: `${id} not found` })
            const { rows } = await pool.query(`DELETE FROM ${tablename} WHERE id=$1`, [id])
            return res.status(200).send({
                message: `${id} deleted from table`,
                data: rows[0]
            })
        } catch (err) {
            return next(err)
        }
    }
}







export async function GetAll(tablename) {
    try {
        const query = `SELECT * FROM ${tablename}`
        const { rows } = await pool.query(query)
        return rows
    } catch (err) {
        throw new Error(err)
    }
}


export const GetOne = async (tablename, id, res) => {
    try {
        const all = await GetAll(tablename)
        const Index = all.findIndex(index => index.id === id)
        if (Index === -1) return res.status(404).send({ message: `${id} not found` })
        const query = `SELECT * FROM ${tablename} WHERE id=$1`
        const { rows } = await pool.query(query, [id])
        return res.status(200).send({
            message: rows[0]
        })
    } catch (err) {
        throw new Error(err)
    }
}


export const DeleteFromtable = async (tablename, id, res) => {
    try {
        const all = await GetAll(tablename)
        console.log(id)
        const Index = all.findIndex(index => index.id === id)
        if (Index === -1) return res.status(404).send({ message: `${id} not found` })
        const query = `DELETE FROM ${tablename} WHERE id=$1`
        const { rows } = await pool.query(query, [id])
        return res.status(200).send({
            message: `${id} deleted from table`,
            data: rows[0]
        })
    } catch (err) {
        throw new Error(err)
    }
}


export const Updatetable = async (tablename, id, req, res) => {
    try {
        const all = await GetAll(tablename)
        const Index = all.findIndex(index => index.id === id)
        if (Index === -1) return res.status(404).send({ message: `${id} not found` })
        const keys = Object.keys(req.body)
        const values = Object.values(req.body)
        let setquery = keys.map((key, i) => `${key}=$${i + 1}`).join(",")
        const query = `UPDATE ${tablename} SET ${setquery} WHERE id=$${keys.length + 1}  RETURNING*`
        const { rows } = await pool.query(query, [...values, id])
        return res.status(200).send({
            message: rows[0]
        })
    } catch (err) {
        throw new Error(err)
    }
}


export const pagination = async (tablename, req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query
        const pageNumber = Number(page)  //0
        const limitNumber = Number(limit)  //1
        const offset = (pageNumber - 1) * limitNumber
        const query = `SELECT * FROM ${tablename} LIMIT $1 OFFSET $2`
        const { rows } = await pool.query(query, [limitNumber, offset])
        return res.status(200).send({
            page: pageNumber,
            limit: offset,
            total: rows.length,
            data: rows
        })
    } catch (err) {
        throw new Error(err)
    }
}

