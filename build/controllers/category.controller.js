"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserCategory = exports.deleteId = exports.getAll = exports.getById = exports.update = exports.create = void 0;
const asynchandler_1 = require("../utils/asynchandler");
const errorhandler_1 = __importDefault(require("../middleware/errorhandler"));
const User_model_1 = __importDefault(require("../models/User.model"));
const category_model_1 = __importDefault(require("./../models/category.model"));
exports.create = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const { name } = req.body;
    const UserId = req.user._id;
    const user = await User_model_1.default.findById(UserId);
    if (!user) {
        throw new errorhandler_1.default('user not found', 404);
    }
    const category = await category_model_1.default.create({ name, user: user._id });
    if (!category) {
        throw new errorhandler_1.default('could not create category', 500);
    }
    res.status(201).json({
        message: 'Category created',
        data: category,
        success: true,
        status: 'success'
    });
});
exports.update = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const UserId = req.user._id;
    if (!id) {
        throw new errorhandler_1.default('category id is required', 400);
    }
    const user = await User_model_1.default.findById(UserId);
    if (!user) {
        throw new errorhandler_1.default('user not found', 404);
    }
    const category = await category_model_1.default.findOneAndUpdate({ _id: id, user: UserId }, { name }, { new: true });
    if (!category) {
        throw new errorhandler_1.default('category not found', 500);
    }
    res.status(201).json({
        message: 'Category updated',
        data: category,
        success: true,
        status: 'success'
    });
});
exports.getById = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const UserId = req.user._id;
    if (!id) {
        throw new errorhandler_1.default('category id is required', 400);
    }
    const category = await category_model_1.default.findById(id);
    if (!category) {
        throw new errorhandler_1.default('category not found', 500);
    }
    res.status(201).json({
        message: 'Category got by id',
        data: category,
        success: true,
        status: 'success'
    });
});
exports.getAll = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const UserId = req.user._id;
    const user = await User_model_1.default.findById(UserId);
    if (!user) {
        throw new errorhandler_1.default('User not found', 404);
    }
    const category = await category_model_1.default.find({ user: UserId });
    if (!category) {
        throw new errorhandler_1.default('category not found', 500);
    }
    res.status(201).json({
        message: 'Category get all',
        data: category,
        success: true,
        status: 'success'
    });
});
exports.deleteId = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const UserId = req.user._id;
    if (!id) {
        throw new errorhandler_1.default('Category ID is required', 400);
    }
    if (!UserId) {
        throw new errorhandler_1.default('User is required', 400);
    }
    const user = await User_model_1.default.findById(UserId);
    if (!user) {
        throw new errorhandler_1.default('User not found', 404);
    }
    const category = await category_model_1.default.deleteOne({ _id: id, user: UserId });
    if (!category) {
        throw new errorhandler_1.default('Category not found or already deleted', 500);
    }
    res.status(201).json({
        message: 'Category deleted',
        data: null,
        success: true,
        status: 'success'
    });
});
exports.getAllUserCategory = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const UserId = req.user._id;
    const category = await category_model_1.default.find({ user: UserId });
    res.status(201).json({
        message: 'Category fetched',
        data: category,
        success: true,
        status: 'success'
    });
});
