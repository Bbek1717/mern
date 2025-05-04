"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getAllExpoByCategory = exports.getAllByUserId = exports.create = void 0;
const expense_model_1 = __importDefault(require("../models/expense.model"));
const asynchandler_1 = require("../utils/asynchandler");
const errorhandler_1 = __importDefault(require("../middleware/errorhandler"));
const category_model_1 = __importDefault(require("../models/category.model"));
const cloudinary_config_1 = require("../config/cloudinary.config");
const send_mail_util_1 = require("../utils/send-mail.util");
const pagination_utils_1 = require("../utils/pagination.utils");
exports.create = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const { categoryId, ...data } = req.body;
    const userId = req.user._id;
    const files = req.files;
    console.log(files);
    if (!categoryId) {
        throw new errorhandler_1.default('category is required', 400);
    }
    const expense = new expense_model_1.default(data);
    const category = await category_model_1.default.findById(categoryId);
    if (!category) {
        throw new errorhandler_1.default('category is required', 400);
    }
    expense.category = category._id;
    expense.user = userId;
    if (files && files.length > 0) {
        files.forEach(receipt => {
            expense.receipts.push({
                path: receipt.path,
                public_id: receipt.filename
            });
        });
    }
    await expense.save();
    const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">New Expense Added by ${req.user.full_name}</h1>
      <h2 style="color: #555; font-size: 20px; margin-bottom: 15px;">Expense Detail</h2>
      <div style="background-color: #fff; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0;">
        <p style="font-size: 16px; color: #555; margin: 10px 0;"><strong>Title:</strong> <span style="color: #000;">${expense.title}</span></p>
        <p style="font-size: 16px; color: #555; margin: 10px 0;"><strong>Amount:</strong> <span style="color: #2d87f0;">Rs.${expense.amount}</span></p>
        <p style="font-size: 16px; color: #555; margin: 10px 0;"><strong>Expense Date:</strong> <span style="color: #000;">${expense.date}</span></p>
        <h3 style="font-weight: 900; color: #007BFF; font-size: 20px; margin-top: 20px;">Description:</h3>
        <p style="font-size: 16px; color: #555; margin-top: 5px;">${expense.description ?? 'No Description Found'}</p>
      </div>
    </div>
  `;
    await (0, send_mail_util_1.sendMail)({
        to: 'b9746153@gmail.com',
        subject: 'Expense Created',
        html
    });
    res.status(201).json({
        status: 'success',
        message: 'Expense added',
        data: null,
        success: true
    });
});
exports.getAllByUserId = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user._id;
    const expenses = await expense_model_1.default.find({ user: userId });
    res.status(201).json({
        status: 'success',
        message: 'Expenses fetched',
        data: expenses,
        success: true
    });
});
exports.getAllExpoByCategory = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const { categoryId } = req.params;
    const userId = req.user._id;
    const { per_page = "10", page = "1" } = req.query;
    const limit = parseInt(per_page);
    const current_page = parseInt(page);
    const skip = (current_page - 1) * limit;
    if (!categoryId) {
        throw new errorhandler_1.default('category is required', 400);
    }
    const expense = await expense_model_1.default.find({ user: userId, category: categoryId }).limit(limit).skip(skip).sort({ createdAt: -1 });
    const total = await expense_model_1.default.countDocuments({ user: userId, category: categoryId });
    const pagination = (0, pagination_utils_1.getPagination)(total, limit, current_page);
    res.status(201).json({
        status: 'success',
        message: 'Expense added',
        data: {
            data: expense,
            pagination
        },
        success: true
    });
});
exports.update = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const { categoryId, title, date, amount, description, removedImages } = req.body;
    const userId = req.user._id;
    const { id } = req.params;
    const files = req.files;
    console.log("expense.controller.ts ~ create ~ files:", files);
    const expense = await expense_model_1.default.findOne({ _id: id, user: userId });
    if (!expense) {
        throw new errorhandler_1.default('expense not found', 404);
    }
    if (title)
        expense.title = title;
    if (amount)
        expense.amount = amount;
    if (description)
        expense.description = description;
    if (date)
        expense.date = date;
    if (files && files.length > 0) {
        files.forEach(receipt => {
            expense.receipts.push({
                path: receipt.path,
                public_id: receipt.filename
            });
        });
    }
    if (removedImages) {
        const deletedImages = JSON.parse(removedImages);
        await (0, cloudinary_config_1.deleteImages)(deletedImages);
        deletedImages.forEach(public_id => {
            expense.receipts.pull({ public_id });
        });
    }
    const updatedExpense = await expense.save();
    res.status(200).json({
        status: 'success',
        message: 'Expense category updated',
        data: updatedExpense,
        success: true
    });
});
exports.remove = (0, asynchandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const expense = await expense_model_1.default.findById(id);
    if (!expense) {
        throw new errorhandler_1.default('Expense not found', 404);
    }
    if (expense.user !== userId) {
        throw new errorhandler_1.default('You can not perform this operation', 400);
    }
    await expense.deleteOne();
    if (expense.receipts && expense.receipts.length > 0) {
        const public_ids = expense.receipts.map(receipt => receipt.public_id);
        await (0, cloudinary_config_1.deleteImages)(public_ids);
    }
    res.status(200).json({
        status: 'success',
        success: true,
        message: 'Expense deleted.',
        data: 'null'
    });
});
