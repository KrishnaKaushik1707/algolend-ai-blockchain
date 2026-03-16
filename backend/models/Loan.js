const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  borrower: String,
  amount: Number,
  purpose: String,
  duration: Number,
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Loan", LoanSchema);
