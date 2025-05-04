import express from 'express'

import { create,  deleteId, getAll, getAllUserCategory, getById, update } from '../controllers/category.controller';
import { authenticate } from '../middleware/authentication.middleware';
import { Role } from '../types/enum.type';

const router = express.Router()

router.post('/',authenticate([Role.USER,Role.ADMIN]), create)
router.put('/:id',authenticate([Role.ADMIN]),update)
router.get('/:id',authenticate([Role.USER]),getById)
router.get('/',authenticate([Role.ADMIN]),getAll)
router.get('/user',authenticate([Role.USER]),getAllUserCategory)
router.delete('/delete/:id',authenticate([Role.USER]),deleteId)


export default router