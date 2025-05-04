import { NextFunction, Request, Response } from "express";
import { Role } from "../types/enum.type";
import CustomError from "./errorhandler";
import { verifyJWT } from "../utils/jwt.utils";
import User from "../models/User.model";

export const authenticate = (roles?: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers['authorization'];
            console.log('Authorization Header:', authHeader);

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new CustomError('Unauthorized, access denied', 401);
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                throw new CustomError('Unauthorized, access denied', 401);
            }

            const decoded = verifyJWT(token);

            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                throw new CustomError('Token expired', 401);
            }

            const user = await User.findById(decoded._id);  
            if (!user) {
                throw new CustomError('Unauthorized, access denied', 401);
            }

        
            if (roles && !roles.includes(user.role)) {
                throw new CustomError('Forbidden, access denied', 403);
            }

            req.user = {
                _id: user._id,
                username: user.username,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            };
            console.log(" Authenticated User:", req.user);
            next();
        } catch (error) {
            next(error);
        }
    };
};
