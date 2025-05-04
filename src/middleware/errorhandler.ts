 import  { NextFunction, Request, Response } from 'express'

 class CustomError extends Error {
     status: 'success' | 'error' | 'fail'
     statusCode: number
     success: boolean
     
     constructor(message: string, statusCode: number) { 
         super(message);
         this.statusCode = statusCode
         this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
         this.success = false
         Error.captureStackTrace(this, CustomError)
     }
 }



 export const errorhandler = ((err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log(err)
    const message = err.message || 'something went wrong'
    const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500
    const status = err.status || 'error'
    const success = err.success || 'false'

    res.status(statusCode).json({
        message ,
        status,
        success
    })
})
export default CustomError
