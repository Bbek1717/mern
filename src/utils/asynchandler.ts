import { NextFunction, Request, RequestHandler, Response } from "express";

type Handler = (req:Request,res:Response,next:NextFunction)=>Promise<any>
export const asyncHandler = (fn:Handler):RequestHandler=>{
    return(req:Request,res:Response,next:NextFunction)=>Promise.resolve(fn(req,res,next)).catch(next)
}