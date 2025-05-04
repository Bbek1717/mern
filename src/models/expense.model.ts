import { model,Schema } from "mongoose";
const expenseSchema = new Schema({
    title:{
        type : String,
        required:[true,'Expense title is required'],
        trim:true
    },
    date:{
        type:Date,
        default:()=>Date.now()
    },
    amount:{
        type:Number,
        required:[true,'Expense amount is required']

    },
  
    description:{
        type:String,
        trim:true,
        min:10,
        max:500
    },
    receipts :[{
        path : {
            type: String,
        },
        public_id:{
            type:String
        }
    }],
    category:{
        type:Schema.Types.ObjectId,
        required:[true,'Expense category is required'],
        ref:'category'

    },
    user:{
        type:Schema.Types.ObjectId,
        required:[true,'Expense user is required'],
        ref:'user'
    }
},{timestamps:true})
const Expense = model('expense',expenseSchema)
export default Expense