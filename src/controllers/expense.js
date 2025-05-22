import ExpenseModel from "../models/ExpenseModel.js"; // To'g'ri eksport/importni tekshiring

// Add Expense
const addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  console.log(req.body);

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).send({ message: "All fields are required!" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    // Ma'lumotlarni saqlash
    const data = await ExpenseModel.create({
      title,
      amount,
      category,
      description,
      date,
    });

    return res.status(200).send({
      message: "Expense Added",
      status: 200,
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

// Get All Expenses
const getExpense = async (req, res) => {
  try {
    const data = await ExpenseModel.find(); // Mongoose uchun `find()` ishlatiladi
    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await ExpenseModel.findByIdAndDelete(id); // ID bo'yicha o'chirish
    if (!data) {
      return res.status(400).send({
        status: 400,
        message: "No expense found with this ID",
      });
    }

    return res.status(200).send({
      status: 200,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

export { addExpense, getExpense, deleteExpense };
