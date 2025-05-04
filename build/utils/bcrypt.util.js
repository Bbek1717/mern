"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hash = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    return await bcryptjs_1.default.hash(password, salt);
};
exports.hash = hash;
const compare = async (password, hash) => {
    return await bcryptjs_1.default.compare(password, hash);
};
exports.compare = compare;
