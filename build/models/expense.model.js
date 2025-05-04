"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const expenseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Expense title is required'],
        trim: true
    },
    date: {
        type: Date,
        default: () => Date.now()
    },
    amount: {
        type: Number,
        required: [true, 'Expense amount is required']
    },
    description: {
        type: String,
        trim: true,
        min: 10,
        max: 500
    },
    receipts: [{
            path: {
                type: String,
            },
            public_id: {
                type: String
            }
        }],
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Expense category is required'],
        ref: 'category'
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Expense user is required'],
        ref: 'user'
    }
}, { timestamps: true });
const Expense = (0, mongoose_1.model)('expense', expenseSchema);
exports.default = Expense;
