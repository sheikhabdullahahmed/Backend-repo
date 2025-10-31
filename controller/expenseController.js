import Expense from '../models/Expense.js';
import xlsx from 'xlsx';


// Add Expense
const addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const {title,  amount, category, date} = req.body;
        if(!title || !amount || !category || !date ){
            return res.status(400).json({ message: "All fields are required" });
        }
        const newExpense = new Expense({
            userId,
            title,
            amount,
            category,
            date
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        console.error("Error adding Expense:", error);
    res.status(500).json({ message: "Error adding Expense" });
    }
};

// Get All Expenses
const getAllExpenses = async (req, res) => {
    const userId = req.user.id;

    try {
        const Expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(Expenses);
    } catch (error) {
        console.error("Error fetching Expenses:", error);
        res.status(500).json({ message: "Error fetching Expenses" });
    }
};

// Delete Expense
const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting Expense:", error);
        res.status(500).json({ message: "Error deleting Expense" });
    }
};

// Download Expenses as Excel
const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id

    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        // Prepare data for Excel
        const data = expenses.map(item => ({
            Amount: item.amount,
            Category: item.category,
            Date: item.date,
        }));

        // Generate Excel file
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook, worksheet, "Expenses");
        xlsx.writeFile(workbook, "expenses.xlsx");
        res.download("expenses.xlsx");
    } catch (error) {
        console.error("Error downloading expenses Excel:", error);
        res.status(500).json({ message: "Error downloading expenses Excel" });
    }
};
export { addExpense, getAllExpenses, deleteExpense, downloadExpenseExcel };