import { Router } from "express";
import { BoardController } from "../controllers/Board.controller.js";
import { validationfactory } from "../middleware/validation.js";
import { boardUpdatevalidation, boardValidation } from "../validation/boardvalidation.js";



const BoardRoutes = Router()

BoardRoutes.get("/", BoardController.getAll)
BoardRoutes.get("/:id", BoardController.getOne)
BoardRoutes.post("/", validationfactory(boardValidation), BoardController.post)
BoardRoutes.put("/:id", validationfactory(boardUpdatevalidation), BoardController.update)
BoardRoutes.delete("/:id", BoardController.delete)


export default BoardRoutes