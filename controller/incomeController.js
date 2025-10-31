import Income from '../models/Income.js';
import xlsx from 'xlsx';


// Add Income
const addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const {title, amount, source, date} = req.body;
        if(!title ||!amount || !source || !date ){
            return res.status(400).json({ message: "All fields are required" });
        }
        const newIncome = new Income({
            userId,
            title,
            amount,
            source,
            date
        });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        console.error("Error adding income:", error);
    res.status(500).json({ message: "Error adding income" });
    }
};

// Get All Incomes
const getAllIncomes = async (req, res) => {
    const userId = req.user.id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error("Error fetching incomes:", error);
        res.status(500).json({ message: "Error fetching incomes" });
    }
};

// Delete Income
const deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ message: "Error deleting income" });
    }
};

// Download Incomes as Excel
const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        // Prepare data for Excel
        const data = income.map(item => ({
            Icon: item.icon,
            Amount: item.amount,
            Source: item.source,
            Date: item.date,
        }));

        // Generate Excel file
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook, worksheet, "Incomes");
        xlsx.writeFile(workbook, "incomes.xlsx");
        res.download("incomes.xlsx");
    } catch (error) {
        console.error("Error downloading income Excel:", error);
        res.status(500).json({ message: "Error downloading income Excel" });
    }
};

export { addIncome, getAllIncomes, deleteIncome, downloadIncomeExcel };