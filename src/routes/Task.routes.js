import { Router } from "express";
import { TaskController } from "../controllers/Task.controller.js";
import { validationfactory } from "../middleware/validation.js";
import { taskvalidation, taskValidationUpdate } from "../validation/taskvalidation.js";


const taskRoutes = Router({ mergeParams: true })

taskRoutes.get("/", TaskController.getAlltasks)
taskRoutes.get("/:id", TaskController.getOnetask)
taskRoutes.post("/", validationfactory(taskvalidation), TaskController.post)
taskRoutes.put("/:id", validationfactory(taskValidationUpdate), TaskController.update)
taskRoutes.delete("/:id", TaskController.delete)


export default taskRoutes