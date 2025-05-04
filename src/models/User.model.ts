import { Schema, model} from 'mongoose'
import { Role } from '../types/enum.type';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UserSchema = new Schema({
    full_name: {
        type: String,
        required: [true,'enter your fullname'],
    },
   
    email: {
        type: String,
        required:[ true,'email is required'],
        unique: [true, 'Email address is already used'],
        validate: {  

            validator: function(v:string) {  
          return emailRegex.test(v);  
        },  
    message: '{VALUE} is not a valid email address!'
    },  
          
    },
    username:{
        type:String,
        required:[true,'enter your username']

    },
    password: {
        type: String,
        required: [true,'Password is required'],
        Min:[ 6,'password must have minimum 6 letters']
    },
    role:{
        type:String,
        enum:Object.values(Role),
        default:Role.USER,
    },
},{timestamps:true})

const User = model('User', UserSchema)
export default User