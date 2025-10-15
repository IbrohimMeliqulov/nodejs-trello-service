import { Router } from "express";
import { ColumnController } from "../controllers/column.controller.js";
import { validationfactory } from "../middleware/validation.js";
import { columnsvalidation, columnsValidationupdate } from "../middleware/columnvalidation.js";



const columnRoutes = Router()

columnRoutes.get("/", ColumnController.getAllColumns)
columnRoutes.get("/:id", ColumnController.getOneColumn)
columnRoutes.post("/", validationfactory(columnsvalidation), ColumnController.post)
columnRoutes.put("/:id", validationfactory(columnsValidationupdate), ColumnController.update)
columnRoutes.delete("/:id", ColumnController.delete)


export default columnRoutes
