import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Majburiy maydon
    },
    amount: {
      type: Number,
      required: true, // Majburiy maydon
    },
    type: {
      type: String,
      default: "income", // Default qiymat
    },
    date: {
      type: Date,
      default: Date.now, // Avtomatik bugungi sanani saqlaydi
    },
    category: {
      type: String,
      required: true, // Majburiy maydon
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true, // createdAt va updatedAt maydonlarini avtomatik qo'shadi
    paranoid: true, // Agar o'chirilgan holatni saqlash uchun qo'shimcha maydon kerak bo'lsa
  }
);

const IncomeModel = mongoose.model("Income", IncomeSchema);

export default IncomeModel;
