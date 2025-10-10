import { Router } from "express";
import { TaskController } from "../controllers/Task.controller.js";

const taskRoutes=Router()

taskRoutes.get("/",TaskController.getAlltasks)
taskRoutes.get("/:id",TaskController.getOneTask)
taskRoutes.post("/",TaskController.post)
taskRoutes.put("/:id",TaskController.put)
taskRoutes.delete("/:id",TaskController.delete)


export default taskRoutes