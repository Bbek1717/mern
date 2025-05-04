"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const errorhandler_1 = __importDefault(require("./errorhandler"));
const jwt_utils_1 = require("../utils/jwt.utils");
const User_model_1 = __importDefault(require("../models/User.model"));
const authenticate = (roles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            console.log('Authorization Header:', authHeader);
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new errorhandler_1.default('Unauthorized, access denied', 401);
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                throw new errorhandler_1.default('Unauthorized, access denied', 401);
            }
            const decoded = (0, jwt_utils_1.verifyJWT)(token);
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                throw new errorhandler_1.default('Token expired', 401);
            }
            const user = await User_model_1.default.findById(decoded._id);
            if (!user) {
                throw new errorhandler_1.default('Unauthorized, access denied', 401);
            }
            if (roles && !roles.includes(user.role)) {
                throw new errorhandler_1.default('Forbidden, access denied', 403);
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
        }
        catch (error) {
            next(error);
        }
    };
};
exports.authenticate = authenticate;
