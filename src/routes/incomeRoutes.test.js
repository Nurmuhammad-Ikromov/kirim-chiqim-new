const request = require("supertest");
const server = require("../app.js"); // express ilovasi asosiy fayl
const IncomeModel = require("../models/incomeModel.js");
const app = server.app; // Ilova instansiyasi

// Mock qilish
jest.mock("../models/incomeModel.js", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

describe("Income Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Har bir testdan oldin mocklarni tozalash
  });

  describe("POST /add-income", () => {
    it("should return 400 if required fields are missing", async () => {
      const res = await request(app).post("/add-income").send({
        title: "Test Income",
        amount: 500, // missing category, description, date
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("All fields are required!");
    });

    it("should add a new income successfully", async () => {
      const incomeData = {
        title: "Test Income",
        amount: 500,
        category: "Salary",
        description: "Monthly Salary",
        date: "2024-12-01",
      };

      IncomeModel.create.mockResolvedValue(incomeData);

      const res = await request(app).post("/add-income").send(incomeData);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Income Added");
      expect(res.body.data[0].title).toBe("Test Income");
    });
  });

  describe("GET /get-incomes", () => {
    it("should fetch all incomes successfully", async () => {
      const incomes = [
        { title: "Income1", amount: 100 },
        { title: "Income2", amount: 200 },
      ];

      IncomeModel.find.mockResolvedValue(incomes);

      const res = await request(app).get("/get-incomes");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(incomes);
    });

    it("should handle server errors gracefully", async () => {
      IncomeModel.find.mockRejectedValue(new Error("Database error"));

      const res = await request(app).get("/get-incomes");

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Server Error");
    });
  });

  describe("DELETE /delete-income/:id", () => {
    it("should delete an income by id", async () => {
      const id = "123";

      IncomeModel.findByIdAndDelete.mockResolvedValue({ id });

      const res = await request(app).delete(`/delete-income/${id}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Income delete success");
    });

    it("should return 400 if no income is found", async () => {
      const id = "123";

      IncomeModel.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app).delete(`/delete-income/${id}`);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Bunday id income yo'q");
    });

    it("should handle server errors gracefully", async () => {
      const id = "123";

      IncomeModel.findByIdAndDelete.mockRejectedValue(
        new Error("Database error")
      );

      const res = await request(app).delete(`/delete-income/${id}`);

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Server Error");
    });
  });
});
