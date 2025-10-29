import express from 'express';
import { addIncome, getAllIncomes, deleteIncome, downloadIncomeExcel } from '../controller/incomeController.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', requireAuth, addIncome);
router.get('/', requireAuth, getAllIncomes);
router.delete('/:id', requireAuth, deleteIncome);
router.get('/download', requireAuth, downloadIncomeExcel);

export default router;
