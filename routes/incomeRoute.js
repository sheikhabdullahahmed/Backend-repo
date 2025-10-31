import express from 'express';
import { addIncome, getAllIncomes, deleteIncome, downloadIncomeExcel } from '../controller/incomeController.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', requireAuth,  addIncome);
router.get('/', requireAuth, getAllIncomes);
router.delete('/:id',  deleteIncome);
router.get('/download', downloadIncomeExcel);

export default router;
