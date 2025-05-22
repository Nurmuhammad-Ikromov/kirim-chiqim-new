import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // .env fayldagi o'zgaruvchilarni yuklash

const DB_URL =
  process.env.DB_URL ||
  "mongodb+srv://Nur:Nurmuhammad1612@books.qkcfe.mongodb.net/?retryWrites=true&w=majority&appName=Books"; // .env fayldan o'qish
console.log(DB_URL);

if (!DB_URL) {
  throw new Error("DB_URL is not defined in .env file");
}

export const newMongoConnection = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};
