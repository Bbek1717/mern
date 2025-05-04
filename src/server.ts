import dotenv from 'dotenv'
dotenv.config()
import express, { NextFunction, Request,  Response, } from 'express'
import { dbconnection } from './config/dbconnect'
import CustomError,{ errorhandler } from './middleware/errorhandler'
import authroutes from './routes/auth.routes'
import helmet from 'helmet'
import categoryRoutes from './routes/category.routes'
import expenseRoutes from './routes/expense.routes'



const PORT = process.env.PORT || 5050
const DB_URL = process.env.DB_URL ?? ''

const app = express()

dbconnection(DB_URL)
app.use(helmet())
app.use(express.urlencoded())
app.use(express.json())
app.use('/api/upload',express.static('upload/'))
app.get('/',(req:Request,res:Response)=>{
    res.status(201).json({
        message:'server is up and running'
    })
})

// using routes
app.use('/api/auth',authroutes)
app.use('/api/category',categoryRoutes)
app.use('/api/expense',expenseRoutes)

app.all('/*spalt',(req:Request,res:Response,next:NextFunction)=>{
    const message = `can not ${req.method} on ${req.url} `
    const error = new CustomError(message,404)
    next(error)
})


app.listen(PORT, ()=> console.log(`server started at http://localhost:${PORT}`))
app.use(errorhandler)

