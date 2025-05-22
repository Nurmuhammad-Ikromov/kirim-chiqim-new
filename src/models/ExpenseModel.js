import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required:  true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    default: "expense",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
}, {
  timestamps:true,
});

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);

export default ExpenseModel; // To'g'ri eksport
