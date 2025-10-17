import { Router } from "express";
import { TaskController } from "../controllers/Task.controller.js";

const tasksRoutes=Router()

tasksRoutes.get("/:user_id",TaskController.getAlltaskByUserId)

export default tasksRoutes