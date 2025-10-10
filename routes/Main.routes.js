import { Router } from "express";
import UserRoutes from "./User.routes.js";
import BoardRoutes from "./Board.routes.js";

const MainRouter=Router()

MainRouter.use("/users",UserRoutes)
MainRouter.use("/boards",BoardRoutes)



export default MainRouter