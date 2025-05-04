import express from "express";
import { create, getAllByUserId, getAllExpoByCategory} from "../controllers/expense.controller";
import { authenticate } from './../middleware/authentication.middleware';
import { Role } from "../types/enum.type";
import { uploader } from "../middleware/upload.middleware";
import { update } from "../controllers/category.controller";

const router = express.Router()
const upload = uploader('receipts')

router.post('/',authenticate([Role.USER]),upload.array('receipts',3),create)
router.put('/:id',authenticate([Role.USER]),upload.array('receipts',3),update)
router.get('/category/:categoryId',getAllExpoByCategory)
router.get('/',authenticate([Role.USER]),getAllByUserId)

export default router