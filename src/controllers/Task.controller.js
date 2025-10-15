import pool from "../config/database.js";


export const TaskController = {
    getAlltasks: async function (req, res, next) {
        try {
            const { boardId } = req.params
            const { page = 1, limit = 10, filter, value } = req.query
            const pageNumber = Number(page)
            const limitNumber = Number(limit)
            const offset = (pageNumber - 1) * limitNumber
            const one = await pool.query(`SELECT * FROM tasks WHERE board_id=$1`, [boardId])
            if (one.rows.length === 0) return res.status(404).send({ message: `There are not any tasks related to this board ${boardId} ` })
            if (filter && value) {
                const query = `SELECT * FROM tasks WHERE board_id=$1 AND ${filter}  ILIKE $2 LIMIT $3 OFFSET $4`
                const { rows } = await pool.query(query, [boardId, `%${value}%`, limitNumber, offset])
                return res.status(200).send({
                    page: pageNumber,
                    limit: limitNumber,
                    total: rows.length,
                    data: rows
                })
            }
            const query = `SELECT * FROM tasks WHERE board_id=$1 LIMIT $2 OFFSET $3`
            const { rows } = await pool.query(query, [boardId, limitNumber, offset])
            return res.status(200).send({
                page: pageNumber,
                limit: limitNumber,
                total: rows.length,
                data: rows
            })
        } catch (err) {
            return next(err)
        }
    },
    getOnetask: async function (req, res, next) {
        try {
            const { id, boardId } = req.params
            const one = await pool.query(`SELECT * FROM tasks WHERE board_id=$1`, [boardId])
            if (one.rows.length === 0) return res.status(404).send({ message: `${boardId} with this id there are not any tasks` })
            const { rows } = await pool.query(`SELECT * FROM tasks WHERE id=$1 AND board_id=$2`, [id, boardId])
            return res.status(200).send(rows[0])
        } catch (err) {
            return next(err)
        }
    },
    post: async function (req, res, next) {
        try {
            const { title, order_index, description, user_id, board_id, column_id } = req.body
            const query = `INSERT INTO tasks(title,order_index,description,user_id,board_id,column_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING*`
            const { rows } = await pool.query(query, [title, order_index, description, user_id, board_id, column_id])
            return res.status(200).send({
                message: rows[0]
            })
        } catch (err) {
            return next(err)
        }
    },
    update: async function (req, res, next) {
        try {
            const { boardId, id } = req.params
            const result = await pool.query("SELECT * FROM tasks WHERE board_id=$1 and id=$2", [boardId, id])
            if (result.rows.length === 0) return res.status(404).send({ message: `There is not any task with id on this board` })
            const keys = Object.keys(req.body)
            const values = Object.values(req.body)
            let setquery = keys.map((key, i) => `${key}=$${i + 1}`).join(",")
            const query = `UPDATE tasks SET ${setquery} WHERE id=$${keys.length + 1} RETURNING*`
            const { rows } = await pool.query(query, [...values, id])
            return res.status(200).send(rows)
        } catch (err) {
            return next(err)
        }
    },
    delete: async function (req, res, next) {
        try {
            const { boardId, id } = req.params
            const result = await pool.query("SELECT * FROM tasks WHERE board_id=$1 and id=$2", [boardId, id])
            if (result.rows.length === 0) return res.status(404).send({ message: `There is not any task with id on this board` })
            const query = `DELETE FROM tasks WHERE board_id=$1 and id=$2 RETURNING*`
            const { rows } = await pool.query(query, [boardId, id])
            return res.status(404).send({
                message: `${id} task deleted from table`,
                data: rows
            })
        } catch (err) {
            return next(err)
        }
    }
}