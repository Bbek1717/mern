"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_config_1 = require("../config/cloudinary.config");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const uploader = (folder) => {
    const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
        cloudinary: cloudinary_config_1.cloudinary,
        params: async (req, file) => {
            return {
                folder: `expense-tracker/${folder}`,
                allowed_formats: ['png', 'jpg', 'jpeg', 'pdf', 'webp'],
            };
        },
    });
    return (0, multer_1.default)({ storage: storage });
};
exports.uploader = uploader;
