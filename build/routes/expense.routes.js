"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expense_controller_1 = require("../controllers/expense.controller");
const authentication_middleware_1 = require("./../middleware/authentication.middleware");
const enum_type_1 = require("../types/enum.type");
const upload_middleware_1 = require("../middleware/upload.middleware");
const category_controller_1 = require("../controllers/category.controller");
const router = express_1.default.Router();
const upload = (0, upload_middleware_1.uploader)('receipts');
router.post('/', (0, authentication_middleware_1.authenticate)([enum_type_1.Role.USER]), upload.array('receipts', 3), expense_controller_1.create);
router.put('/:id', (0, authentication_middleware_1.authenticate)([enum_type_1.Role.USER]), upload.array('receipts', 3), category_controller_1.update);
router.get('/category/:categoryId', expense_controller_1.getAllExpoByCategory);
router.get('/', (0, authentication_middleware_1.authenticate)([enum_type_1.Role.USER]), expense_controller_1.getAllByUserId);
exports.default = router;
