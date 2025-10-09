import { Router } from "express";
import UserRoutes from "./User.routes.js";

const MainRouter=Router()

MainRouter.use("/users",UserRoutes)



export default MainRouter