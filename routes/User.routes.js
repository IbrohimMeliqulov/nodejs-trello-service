import { Router } from "express";
import { deleteUser, getAll, getOne, login, register, update } from "../controllers/User.controller.js";
import { RegisterUser, UpdateUservalidation, validationfactory } from "../middleware/validation.js";


const UserRoutes=Router()

UserRoutes.get("/",getAll)
UserRoutes.post("/login",login)
UserRoutes.post("/register",validationfactory(RegisterUser),register)
UserRoutes.get("/:id",getOne)
UserRoutes.put("/:id",validationfactory(UpdateUservalidation),update)
UserRoutes.delete("/:id",deleteUser)


export default UserRoutes