import { Router } from "express";
import { TaskController } from "../controllers/Task.controller.js";
import { taskvalidation, taskValidationUpdate, validationfactory } from "../middleware/validation.js";

const taskRoutes=Router({mergeParams:true})

taskRoutes.get("/",TaskController.getAlltasks)
taskRoutes.get("/:id",TaskController.getOneTask)
taskRoutes.post("/",validationfactory(taskvalidation),TaskController.post)
taskRoutes.put("/:id",validationfactory(taskValidationUpdate),TaskController.update)
taskRoutes.delete("/:id",TaskController.delete)


export default taskRoutes