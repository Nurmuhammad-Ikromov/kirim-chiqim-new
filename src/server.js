import express from "express";
import cors from "cors";
import { newMongoConnection } from "./config/index.js";
import userRoutes from "./routes/user.js";
import transactionRoutes from "./routes/transactions.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", userRoutes);
app.use("/", transactionRoutes);
app.options('*', cors()); // Allow preflight requests

try {
  await newMongoConnection();
} catch (error) {
  console.error("MongoDB connection failed:", error.message);
  process.exit(1); // Ulanish muvaffaqiyatsiz bo'lsa, serverni to'xtatadi
}

app.listen(9090, () => console.log("Server is running on port 9090"));
