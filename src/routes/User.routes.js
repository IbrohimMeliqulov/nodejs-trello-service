import { Router } from "express";
import { deletetable, deleteUser, getAll, getOne, login, register, setup, update } from "../controllers/User.controller.js";
import { validationfactory } from "../middleware/validation.js";
import { RegisterUser, UpdateUservalidation } from "../middleware/uservalidation.js";


const UserRoutes = Router()

UserRoutes.get("/", getAll)
UserRoutes.post("/setup", setup)
UserRoutes.post("/abort", deletetable)
UserRoutes.post("/login", login)
UserRoutes.post("/register", validationfactory(RegisterUser), register)
UserRoutes.get("/:id", getOne)
UserRoutes.put("/:id", validationfactory(UpdateUservalidation), update)
UserRoutes.delete("/:id", deleteUser)


export default UserRoutes