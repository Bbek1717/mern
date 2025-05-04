"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_type_1 = require("../types/enum.type");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UserSchema = new mongoose_1.Schema({
    full_name: {
        type: String,
        required: [true, 'enter your fullname'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'Email address is already used'],
        validate: {
            validator: function (v) {
                return emailRegex.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        },
    },
    username: {
        type: String,
        required: [true, 'enter your username']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        Min: [6, 'password must have minimum 6 letters']
    },
    role: {
        type: String,
        enum: Object.values(enum_type_1.Role),
        default: enum_type_1.Role.USER,
    },
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
