import jwt, { JwtPayload } from "jsonwebtoken";
import { Payload } from "../types/global.type";

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN || '1d';

export const generateJwtToken = (payload: Payload) => {
    return jwt.sign(payload,JWT_SECRET, { expiresIn: JWT_EXPIRE_IN as any });
    
};
export const verifyJWT = (token:string):JwtPayload=>{
    return jwt.verify(token,JWT_SECRET) as JwtPayload
}
