import express from "express";

const app = express();
// Middleware va marshrutlarni qo'shish
app.use(express.json());

// Eksport qilish
export { app };
