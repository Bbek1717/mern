"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const asynchandler_1 = require("../utils/asynchandler");
const bcrypt_util_1 = require("../utils/bcrypt.util");
const errorhandler_1 = __importDefault(require("../middleware/errorhandler"));
const jwt_utils_1 = require("../utils/jwt.utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.register = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const { password, ...data } = req.body;
    if (!password) {
        throw new errorhandler_1.default('password is required', 400);
    }
    console.log(data);
    const hashedpassword = await bcryptjs_1.default.hash(password, 10);
    const user = await User_model_1.default.create({ ...data, password: hashedpassword });
    res.status(201).json({
        message: 'User register success',
        data: user,
        success: true,
        status: 'success'
    });
});
exports.login = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const { password, email } = req.body;
    if (!password) {
        throw new errorhandler_1.default('Password is required', 400);
    }
    if (!email) {
        throw new errorhandler_1.default('Email is required', 400);
    }
    const user = await User_model_1.default.findOne({ email });
    if (!user || !user.password) {
        throw new errorhandler_1.default('Invalid email or password', 400);
    }
    const ispasswordmatched = await (0, bcrypt_util_1.compare)(password, user.password);
    if (!ispasswordmatched) {
        throw new errorhandler_1.default('Invalid email or password', 400);
    }
    const token = (0, jwt_utils_1.generateJwtToken)({ _id: user._id, full_name: user.full_name, email: user.email, username: user.username, role: user.role });
    res.status(201).json({
        message: 'User login success',
        data: user,
        success: true,
        access_token: token,
        status: 'success'
    });
});
