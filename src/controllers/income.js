import IncomeModel from "../models/incomeModel.js";

const addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  console.log(req.body);

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).send({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .send({ message: "Amount must be a positive number!" });
    }
    const data = new IncomeModel({
      title,
      amount,
      category,
      description,
    });
    await data.save();
    
    return res.status(200).send({
      message: "Income Added",
      status: 200,
      data: [data],
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).send({ message: "Server Error" });
  }
};

const getIncomes = async (req, res) => {
  try {
    console.log("request");

    const data = await IncomeModel.find();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ message: "Server Error" });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await IncomeModel.findByIdAndDelete(id);
    if (data == 0) {
      return res.status(400).send({
        status: 400,
        message: "Bunday id income yo'q",
      });
    }

    return res.status(200).send({
      status: 200,
      message: "Income delete success",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export { deleteIncome, getIncomes, addIncome };
