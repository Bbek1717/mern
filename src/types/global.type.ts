import mongoose from "mongoose";
import { Role } from "./enum.type";

export interface Payload {
    _id:mongoose.Types.ObjectId,
    full_name: string,
    email: string,
    username?: string,
    role:Role
}