import { Request, Response } from "express";
import { asyncHandler } from "../utils/asynchandler";
import User from "../models/User.model";
import CustomError from "../middleware/errorhandler";


export const getprofile = asyncHandler(async(req:Request, res:Response)=>{
  const { UserId }= req.params
  const user = await User.findById(UserId)
  if(!user){
    throw new CustomError('user not found',400)
  }
  res.status(200).json({
    message: 'profile fetched success',
    status : 'success',
    success:true,
    data:user
  })
})
export const updateprofile = asyncHandler(async(req:Request, res:Response)=>{
  const { userId }= req.params
  const data = req.body
  const user = await User.findById(userId)
  if(!user){
    throw new CustomError('user not found',400)
  }
  const updateduser = await User.findByIdAndUpdate(userId,data,{new:true})
  res.status(200).json({
    message: 'profile fetched success',
    status : 'success',
    success:true,
    data:updateduser
  })
})