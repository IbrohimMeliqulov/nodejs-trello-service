import express from "express"
import ErrorHandler from "./middleware/errorHandler.js"
import MainRouter from "./routes/Main.routes.js"

const app=express()
app.use(express.json())
const PORT=process.env.PORT||4000

app.use("/",MainRouter)


app.all("/:any",(req,res)=>{
    res.status(404).send({
        success:false,
        message:`${req.originalUrl} not found on the server`
    })
})
app.use(ErrorHandler)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})