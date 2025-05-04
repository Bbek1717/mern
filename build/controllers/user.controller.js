"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateprofile = exports.getprofile = void 0;
const asynchandler_1 = require("../utils/asynchandler");
const User_model_1 = __importDefault(require("../models/User.model"));
const errorhandler_1 = __importDefault(require("../middleware/errorhandler"));
exports.getprofile = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const { UserId } = req.params;
    const user = await User_model_1.default.findById(UserId);
    if (!user) {
        throw new errorhandler_1.default('user not found', 400);
    }
    res.status(200).json({
        message: 'profile fetched success',
        status: 'success',
        success: true,
        data: user
    });
});
exports.updateprofile = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const data = req.body;
    const user = await User_model_1.default.findById(userId);
    if (!user) {
        throw new errorhandler_1.default('user not found', 400);
    }
    const updateduser = await User_model_1.default.findByIdAndUpdate(userId, data, { new: true });
    res.status(200).json({
        message: 'profile fetched success',
        status: 'success',
        success: true,
        data: updateduser
    });
});
