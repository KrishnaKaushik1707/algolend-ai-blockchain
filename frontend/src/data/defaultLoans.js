export const defaultMarketplaceLoans = [
  {
    _id: "seed-mkt-1",
    borrower: "Ayesha Khan",
    amount: 25000,
    duration: 12,
    interestRate: 9.2,
    purpose: "Home Improvement",
    status: "pending",
  },
  {
    _id: "seed-mkt-2",
    borrower: "Vikram Patel",
    amount: 12000,
    duration: 6,
    interestRate: 8.1,
    purpose: "Debt Consolidation",
    status: "pending",
  },
  {
    _id: "seed-mkt-3",
    borrower: "Neha Verma",
    amount: 50000,
    duration: 24,
    interestRate: 10.4,
    purpose: "Small Business",
    status: "pending",
  },
];

export function getDefaultUserLoans(borrowerName = "Rahul Sharma") {
  return [
    {
      _id: "seed-my-1",
      borrower: borrowerName,
      amount: 15000,
      duration: 12,
      interestRate: 8.7,
      purpose: "Medical Expenses",
      status: "pending",
    },
    {
      _id: "seed-my-2",
      borrower: borrowerName,
      amount: 30000,
      duration: 24,
      interestRate: 9.6,
      purpose: "Home Improvement",
      status: "active",
    },
    {
      _id: "seed-my-3",
      borrower: borrowerName,
      amount: 8000,
      duration: 6,
      interestRate: 7.9,
      purpose: "Other",
      status: "paid",
    },
  ];
}

