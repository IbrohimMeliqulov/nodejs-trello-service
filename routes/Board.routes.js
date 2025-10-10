import { Router } from "express";
import { BoardController } from "../controllers/Board.controller.js";
import { boardUpdatevalidation, boardValidation, validationfactory } from "../middleware/validation.js";


const BoardRoutes=Router()

BoardRoutes.get("/",BoardController.getAll)
BoardRoutes.get("/:id",BoardController.getOne)
BoardRoutes.post("/",validationfactory(boardValidation),BoardController.post)
BoardRoutes.put("/:id",validationfactory(boardUpdatevalidation),BoardController.put)
BoardRoutes.delete("/:id",BoardController.delete)


export default BoardRoutes