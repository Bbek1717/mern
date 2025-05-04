import { Request, Response } from "express";
import { asyncHandler } from "../utils/asynchandler";
import CustomError from "../middleware/errorhandler";
import User from "../models/User.model";
import Category from './../models/category.model';
export const create = asyncHandler(async(req:Request,res:Response)=>{
    const {name} =req.body
    const UserId = req.user._id
   
    const user = await User.findById(UserId)
    if(!user){
        throw new CustomError('user not found',404)
    }
    const category = await Category.create({name,user:user._id})
    if(!category){
        throw new CustomError('could not create category',500)
        }
        res.status(201).json({
            message :'Category created',
            data :category,
            success : true,
            status : 'success'
        })
    })
export const update = asyncHandler(async(req:Request,res:Response)=>{
    const {name} =req.body
    const {id}= req.params
    const UserId = req.user._id
    if (!id){
        throw new CustomError('category id is required',400)
    }
   
    const user = await User.findById(UserId)
    if(!user){
        throw new CustomError('user not found',404)
    }
    const category = await Category.findOneAndUpdate({_id:id,user:UserId},{name},{new:true})
    if(!category){
        throw new CustomError('category not found',500)
    }
    res.status(201).json({
        message :'Category updated',
        data :category,
        success : true,
        status : 'success'
    })
})
export const getById = asyncHandler(async(req:Request,res:Response)=>{
    const {id}= req.params
    const UserId = req.user._id
    if (!id){
        throw new CustomError('category id is required',400)
    }
    const category = await Category.findById(id)
    if(!category){
        throw new CustomError('category not found',500)
    }
    res.status(201).json({
        message :'Category got by id',
        data :category,
        success : true,
        status : 'success'
    })
})
    export const getAll = asyncHandler(async (req: Request, res: Response) => {
        const UserId = req.user._id
        const user = await User.findById(UserId);
        if (!user) {
            throw new CustomError('User not found', 404);
        }
            const category = await Category.find({ user: UserId })
        if(!category){
            throw new CustomError('category not found',500)
        } res.status(201).json({
            message :'Category get all',
            data:category,
            success : true,
            status : 'success'
        })
    })
        export const deleteId = asyncHandler(async (req: Request, res: Response) => {
           
            const { id } = req.params;
            const UserId = req.user._id
            if (!id) {
                throw new CustomError('Category ID is required', 400);
            }
        
            if (!UserId) {
                throw new CustomError('User is required', 400);
            }
        
            const user = await User.findById(UserId);
            if (!user) {
                throw new CustomError('User not found', 404);
            }
        
            const category = await Category.deleteOne({ _id: id, user: UserId })
        
            if (!category) {
                throw new CustomError('Category not found or already deleted', 500)
            }        
    
    res.status(201).json({
        message :'Category deleted',
        data:null,
        success : true,
        status : 'success'
    })
        })
        export const getAllUserCategory= asyncHandler(async (req: Request, res: Response) => {
            const UserId = req.user._id          
            const category = await Category.find({user:UserId})        
    
    res.status(201).json({
        message :'Category fetched',
        data :category,
        success : true,
        status : 'success'
    })

    })

