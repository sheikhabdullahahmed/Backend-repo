import express from 'express';
// import { addExpense, getAllExpenses, deleteExpense, downloadExpenseExcel } from '../controller/expenseController.js';
import { addExpense } from '../controller/expenseController.js'; 
import requireAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', requireAuth, addExpense);
router.get('/', requireAuth, getAllExpenses);
router.delete('/:id', requireAuth, deleteExpense);
router.get('/download', requireAuth, downloadExpenseExcel);

export default router;