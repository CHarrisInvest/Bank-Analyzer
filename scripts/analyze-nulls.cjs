#!/usr/bin/env node
const data = require('../public/data/banks.json');
const totalBanks = data.length;

const fieldsOfInterest = {
  "Net Interest Margin (NIM)": "netInterestMargin",
  "AFS Securities": "afsSecurities",
  "HTM Securities": "htmSecurities",
  "Allowance for Credit Losses (ACL)": "allowanceForCreditLosses",
  "ACL/Loans Ratio": "aclToLoans",
  "Premises & Equipment": "premisesAndEquipment",
  "Short-term Borrowings": "shortTermBorrowings",
  "Long-term Debt": "longTermDebt",
  "Goodwill": "goodwill",
  "Intangibles": "intangibles",
  "Avg Earning Assets": "avgEarningAssets",
};

console.log("DETAILED ANALYSIS OF SPECIFIC METRICS");
console.log("Total banks:", totalBanks);
console.log("═".repeat(80));
console.log("");

Object.entries(fieldsOfInterest).forEach(([label, field]) => {
  const nullCount = data.filter(b => b[field] === null || b[field] === undefined).length;
  const zeroCount = data.filter(b => b[field] === 0).length;
  const hasDataCount = totalBanks - nullCount;
  const nullPct = ((nullCount / totalBanks) * 100).toFixed(1);
  const nonZeroCount = data.filter(b => b[field] !== null && b[field] !== undefined && b[field] > 0).length;

  console.log(label + " (" + field + ")");
  console.log("  Has data: " + hasDataCount + "/" + totalBanks + " (" + (100 - parseFloat(nullPct)).toFixed(1) + "%)");
  console.log("  Null: " + nullCount + " (" + nullPct + "%)");
  console.log("  Zero values: " + zeroCount);
  console.log("  Positive values: " + nonZeroCount);
  console.log("");
});

console.log("═".repeat(80));
console.log("SECURITIES COVERAGE ANALYSIS");
console.log("═".repeat(80));
const hasAFS = data.filter(b => b.afsSecurities !== null && b.afsSecurities > 0).length;
const hasHTM = data.filter(b => b.htmSecurities !== null && b.htmSecurities > 0).length;
const hasEither = data.filter(b => (b.afsSecurities !== null && b.afsSecurities > 0) || (b.htmSecurities !== null && b.htmSecurities > 0)).length;
const hasBoth = data.filter(b => (b.afsSecurities !== null && b.afsSecurities > 0) && (b.htmSecurities !== null && b.htmSecurities > 0)).length;
const hasNeither = totalBanks - hasEither;

console.log("Has AFS > 0: " + hasAFS + " (" + (hasAFS/totalBanks*100).toFixed(1) + "%)");
console.log("Has HTM > 0: " + hasHTM + " (" + (hasHTM/totalBanks*100).toFixed(1) + "%)");
console.log("Has either: " + hasEither + " (" + (hasEither/totalBanks*100).toFixed(1) + "%)");
console.log("Has both: " + hasBoth + " (" + (hasBoth/totalBanks*100).toFixed(1) + "%)");
console.log("Has neither: " + hasNeither + " (" + (hasNeither/totalBanks*100).toFixed(1) + "%)");

console.log("");
console.log("═".repeat(80));
console.log("GOODWILL/INTANGIBLES ANALYSIS");
console.log("═".repeat(80));
const goodwillZero = data.filter(b => b.goodwill === 0).length;
const goodwillPositive = data.filter(b => b.goodwill > 0).length;
const intangiblesZero = data.filter(b => b.intangibles === 0).length;
const intangiblesPositive = data.filter(b => b.intangibles > 0).length;
const bothZero = data.filter(b => b.goodwill === 0 && b.intangibles === 0).length;

console.log("Goodwill = 0: " + goodwillZero + " (many small banks have no goodwill - valid)");
console.log("Goodwill > 0: " + goodwillPositive);
console.log("Intangibles = 0: " + intangiblesZero);
console.log("Intangibles > 0: " + intangiblesPositive);
console.log("Both = 0: " + bothZero + " (banks with no acquisitions - valid)");

console.log("");
console.log("═".repeat(80));
console.log("DEBT ANALYSIS");
console.log("═".repeat(80));
const hasSTDebt = data.filter(b => b.shortTermBorrowings !== null && b.shortTermBorrowings > 0).length;
const hasLTDebt = data.filter(b => b.longTermDebt !== null && b.longTermDebt > 0).length;
const hasEitherDebt = data.filter(b =>
  (b.shortTermBorrowings !== null && b.shortTermBorrowings > 0) ||
  (b.longTermDebt !== null && b.longTermDebt > 0)
).length;
const hasNoDebt = totalBanks - hasEitherDebt;

console.log("Has ST Borrowings > 0: " + hasSTDebt + " (" + (hasSTDebt/totalBanks*100).toFixed(1) + "%)");
console.log("Has LT Debt > 0: " + hasLTDebt + " (" + (hasLTDebt/totalBanks*100).toFixed(1) + "%)");
console.log("Has either: " + hasEitherDebt + " (" + (hasEitherDebt/totalBanks*100).toFixed(1) + "%)");
console.log("Has no debt reported: " + hasNoDebt + " (may be deposit-funded only - valid for small banks)");
