import { Router } from "express";
import { ColumnController } from "../controllers/column.controller";
import { columnsvalidation, columnsvalidationupdate, validationfactory } from "../middleware/validation";


const columnRoutes=Router()

columnRoutes.get("/",ColumnController.getAllColumns)
columnRoutes.get("/:id",ColumnController.getOneColumn)
columnRoutes.post("/",validationfactory(columnsvalidation),ColumnController.post)
columnRoutes.put("/:id",validationfactory(columnsvalidationupdate),ColumnController.put)
columnRoutes.delete("/:id",ColumnController.delete)


export default columnRoutes
