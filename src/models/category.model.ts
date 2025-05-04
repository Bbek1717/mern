import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name :{
     type : String,
     required : [true,'name is required'],
    },
    user:{
        type : mongoose.Types.ObjectId,
        required:[true,'User is required'],
        ref:'user'
    }
},{timestamps:true})

const Category = mongoose.model('category',categorySchema)
export default Category