import multer from "multer";
import fs from 'fs'
import path from "path";
import { cloudinary } from "../config/cloudinary.config";
import { CloudinaryStorage} from'multer-storage-cloudinary';
export const uploader = (folder:String)=>{
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async(req,file)=>{
         return { 
            folder: `expense-tracker/${folder}`,
            allowed_formats: ['png','jpg','jpeg','pdf','webp'] ,
        }},
      });
return  multer({storage:storage})
}