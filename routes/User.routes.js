import { Router } from "express";
import { deleteUser, getAll, getOne, login, register, update } from "../controllers/User.controller.js";


const UserRoutes=Router()

UserRoutes.get("/",getAll)
UserRoutes.post("/login",login)
UserRoutes.post("/register",register)
UserRoutes.get("/:id",getOne)
UserRoutes.put("/:id",update)
UserRoutes.delete("/:id",deleteUser)


export default UserRoutes