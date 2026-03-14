const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let loans = [];

app.get("/", (req, res) => {
  res.send("AlgoLend Backend Running");
});

app.post("/apply-loan", (req, res) => {
  const loanData = req.body;

  loans.push({
    id: loans.length + 1,
    ...loanData,
    status: "pending",
  });

  res.json({ message: "Loan request created successfully" });
});

app.get("/loan-marketplace", (req, res) => {
  res.json(loans);
});

app.listen(9000, () => {
  console.log("Server running on port 9000");
});
