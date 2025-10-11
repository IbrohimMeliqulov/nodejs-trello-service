import { Router } from "express";
import UserRoutes from "./User.routes.js";
import BoardRoutes from "./Board.routes.js";
import taskRoutes from "./Task.routes.js";
import columnRoutes from "./column.routes.js";

const MainRouter=Router()

MainRouter.use("/users",UserRoutes)
MainRouter.use("/boards",BoardRoutes)
MainRouter.use("/boards/:boardId/tasks",taskRoutes)
MainRouter.use("/columns",columnRoutes)


export default MainRouter