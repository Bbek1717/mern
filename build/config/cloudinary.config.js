"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.deleteImages = void 0;
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
// Configuration
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});
const deleteImages = async (publicIDs) => {
    publicIDs.forEach(async (public_id) => {
        await cloudinary_1.v2.uploader.destroy(public_id);
    });
};
exports.deleteImages = deleteImages;
