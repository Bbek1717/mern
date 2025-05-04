import type { Request, Response } from 'express'
import User from '../models/User.model';
import { asyncHandler } from '../utils/asynchandler';
import { hash ,compare} from '../utils/bcrypt.util'
import CustomError from '../middleware/errorhandler';
import {generateJwtToken} from '../utils/jwt.utils';
import bcrypt from 'bcryptjs'

export const register= asyncHandler(async (req: Request, res: Response) => {
const {password,...data} = req.body
if (!password){
  throw new  CustomError('password is required',400)

}
console.log(data)
const hashedpassword =await bcrypt.hash(password,10)
const user = await User.create({...data,password:hashedpassword})
res.status(201).json({
   message: 'User register success',
   data:user,
   success: true,
   status: 'success'
})
})
export const login = asyncHandler(async (req: Request, res: Response) => {
  const {password,email} = req.body
  if (!password){
    throw new  CustomError('Password is required',400)
  
  }
  if (!email){
    throw new  CustomError('Email is required',400)
  
  }
  const user = await User.findOne({email})
  if (!user|| !user.password){
    throw new  CustomError('Invalid email or password',400)
  }
  const ispasswordmatched = await compare(password,user.password)
  if (!ispasswordmatched){
    throw new  CustomError('Invalid email or password',400)
  }
  const token = generateJwtToken({_id:user._id,full_name:user.full_name ,email:user.email,username:user.username, role:user.role})
  
  res.status(201).json({
     message: 'User login success',
     data:user,
     success: true,
     access_token :token,
     status: 'success'
  })
  })




