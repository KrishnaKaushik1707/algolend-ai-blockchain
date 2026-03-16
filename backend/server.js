const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Loan = require("./models/Loan");

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

// root route
app.get("/", (req, res) => {
  res.send("AlgoLend Backend Running");
});

//apply loan route
app.post("/apply-loan", async (req, res) => {
  try {
    const loan = new Loan(req.body);

    await loan.save();

    res.json({
      message: "Loan created",
      loan,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//loan marketplace route
app.get("/loan-marketplace", async (req, res) => {
  const loans = await Loan.find();

  res.json(loans);
});

//api for user loans
app.get("/user-loans/:borrower", async (req, res) => {
  try {
    const loans = await Loan.find({
      borrower: req.params.borrower,
    });

    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(9000, () => {
  console.log("Server running on port 9000");
});
