# SEC Financial Statement Data Sets - Concept Mapping

This document maps SEC EDGAR XBRL concepts to the calculated metrics used in BankSift.

## Data Source

BankSift uses the **SEC Financial Statement Data Sets** to fetch financial data.

### SEC Financial Statement Data Sets

**URL:** `https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets`

**Script:** `scripts/fetch-sec-fs-datasets.cjs`

**Features:**
- Quarterly ZIP file releases with complete filing data
- Presentation linkbase (`pre.txt`) for "as reported on face" structure
- Numerical data (`num.txt`) with explicit `qtrs` period indicator
- Submission metadata (`sub.txt`) for filing details

---

## Output Files

| File | Description |
|------|-------------|
| `public/data/banks.json` | Calculated metrics for all banks |
| `public/data/banks/{cik}.json` | Full raw data per bank (historical statements) |
| `public/data/sec-data-index.json` | Metadata and bank data index |

---

## XBRL Concepts Extracted

### Balance Sheet (Point-in-Time, qtrs=0)

| XBRL Concept | Unit | Used For |
|--------------|------|----------|
| `Assets` | USD | Total Assets, ROAA, ratios |
| `StockholdersEquity` | USD | Total Equity, ROE, Book Value |
| `StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest` | USD | Fallback for Equity |
| `Deposits` | USD | Deposits/Assets ratio |
| `DepositsDomestic` | USD | Fallback for Deposits |
| `Liabilities` | USD | Total Liabilities |
| `PreferredStockValue` | USD | Preferred stock (for common equity calc) |
| `CommonStockSharesOutstanding` | shares | Shares for per-share calculations |
| `CashAndCashEquivalentsAtCarryingValue` | USD | Cash position |
| `CashAndDueFromBanks` | USD | Fallback for Cash |
| `LoansAndLeasesReceivableNetReportedAmount` | USD | Loans |
| `LoansAndLeasesReceivableNetOfDeferredIncome` | USD | Fallback for Loans |
| `FinancingReceivableExcludingAccruedInterestAfterAllowanceForCreditLoss` | USD | Fallback for Loans |

### Income Statement (TTM from quarterly filings, qtrs=1)

| XBRL Concept | Unit | Used For |
|--------------|------|----------|
| `NetIncomeLoss` | USD | Net Income, ROE, ROAA |
| `ProfitLoss` | USD | Fallback for Net Income |
| `NetIncomeLossAvailableToCommonStockholdersBasic` | USD | Net Income to Common |
| `PreferredStockDividendsAndOtherAdjustments` | USD | For NI to Common derivation |
| `EarningsPerShareBasic` | USD/shares | EPS, Graham Number |
| `EarningsPerShareDiluted` | USD/shares | Fallback for EPS |
| `InterestIncomeExpenseNet` | USD | Net Interest Income |
| `NetInterestIncome` | USD | Fallback for NII |
| `InterestIncome` | USD | Interest Income |
| `InterestAndDividendIncomeOperating` | USD | Fallback |
| `InterestExpense` | USD | Interest Expense |
| `NoninterestIncome` | USD | Efficiency Ratio |
| `NoninterestExpense` | USD | Efficiency Ratio |
| `OperatingExpenses` | USD | Fallback for NIE |
| `ProvisionForLoanLeaseAndOtherLosses` | USD | Provision |
| `ProvisionForCreditLosses` | USD | Fallback |
| `IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest` | USD | Pre-tax income |

### Dividend Concepts (TTM)

| XBRL Concept | Unit | Used For |
|--------------|------|----------|
| `CommonStockDividendsPerShareDeclared` | USD/shares | TTM DPS |
| `CommonStockDividendsPerShareCashPaid` | USD/shares | Fallback |

---

## Financial Statement Data Sets Structure

The data is provided in quarterly ZIP files containing tab-separated files:

### sub.txt (Submissions)
```
adsh    cik     name    sic     form    filed   fy      fp
0000018255-24-000123    18255   JPMORGAN CHASE & CO    6022    10-Q    2024-11-01  2024    Q3
```

### num.txt (Numeric Data)
```
adsh    tag     version     ddate       qtrs    value       uom
0000018255-24-000123    Assets  us-gaap/2024    20240930    0   4200000000000   USD
0000018255-24-000123    NetIncomeLoss   us-gaap/2024    20240930    1   15000000000 USD
```

### pre.txt (Presentation Linkbase)
```
adsh    report  line    stmt    inpth   tag     version     plabel  negating
0000018255-24-000123    2   10  BS  0   Assets  us-gaap/2024    Total assets    0
```

### Key Fields

| Field | Description |
|-------|-------------|
| `adsh` | Accession number (filing ID) |
| `ddate` | Period end date (YYYYMMDD) |
| `qtrs` | Period length: 0=point-in-time, 1=quarter, 4=annual |
| `stmt` | Statement type: BS, IS, CF, EQ, CI |
| `line` | Presentation line number |
| `negating` | 1 if value should be negated in presentation |
| `inpth` | 1 if parenthetical (excluded from primary statements) |

---

## TTM Calculation Logic

### Rule A: Quarterly-First
If 4+ quarterly periods exist, sum the most recent 4 quarters.

### Rule B: Annual Fallback
Only use annual value if fewer than 4 quarterly periods exist AND the annual period is more recent.

**NEVER mix annual and quarterly values.**

```javascript
// Rule A
if (quarterlyValues.length >= 4) {
  return sum(quarterlyValues.slice(0, 4));
}

// Rule B
if (annualValues.length > 0 && annualValues[0].date >= quarterlyValues[0]?.date) {
  return annualValues[0].value;
}
```

---

## FFIEC 5-Point Averaging

Return ratios (ROE, ROAA) use 5-point average balance sheet values per FFIEC UBPR methodology:

```javascript
// Use up to 5 periods for averaging
const periodsToUse = pointInTime.slice(0, 5);
const average = sum(periodsToUse.map(p => p.value)) / periodsToUse.length;
```

---

## Calculated Metrics

### Balance Sheet Derived

| Metric | Formula |
|--------|---------|
| Book Value Per Share | `(Equity - PreferredStock) / Shares` |

### Profitability Ratios

| Metric | Formula |
|--------|---------|
| ROE % | `NetIncome(TTM) / AvgEquity × 100` |
| ROAA % | `NetIncome(TTM) / AvgAssets × 100` |

### Bank-Specific Ratios

| Metric | Formula | Typical Range |
|--------|---------|---------------|
| Efficiency Ratio % | `NIE / (NII + NonintIncome) × 100` | 50-70% |
| Deposits/Assets % | `Deposits / Assets × 100` | 70-85% |
| Equity/Assets % | `Equity / Assets × 100` | 8-12% |
| Loans/Assets % | `Loans / Assets × 100` | 50-75% |
| Loans/Deposits % | `Loans / Deposits × 100` | 70-100% |

### Graham Value Metrics

| Metric | Formula |
|--------|---------|
| Graham Number | `√(22.5 × EPS × BVPS)` |
| Graham MoS ($) | `GrahamNumber - Price` (requires price data) |
| Graham MoS (%) | `(GrahamNumber - Price) / Price × 100` (requires price data) |

### Price-Dependent Metrics (Placeholders)

The following metrics require external price data and are currently null:

| Metric | Formula | Status |
|--------|---------|--------|
| Price | External source | Placeholder |
| Market Cap | `Price × Shares` | Placeholder |
| P/E Ratio | `Price / EPS` | Placeholder |
| P/B Ratio | `Price / BVPS` | Placeholder |

---

## Data Quality Validation

Metrics are validated against outlier thresholds:

| Metric | Min | Max |
|--------|-----|-----|
| Efficiency Ratio | 20% | 150% |
| Deposits/Assets | 10% | 100% |
| Equity/Assets | 1% | 50% |
| ROE | -100% | 100% |
| ROAA | -10% | 10% |

Values outside these ranges are flagged and nulled out.

---

## Running the Script

### Process Cached Data

```bash
node scripts/fetch-sec-fs-datasets.cjs --verbose
```

This will:
1. Read quarterly ZIP files from `.sec-data-cache/`
2. Parse sub.txt, num.txt, pre.txt files
3. Build "as reported" financial statements
4. Calculate TTM metrics
5. Save to `banks.json` and individual bank files

---

## GitHub Actions Workflow

| Workflow | Schedule | Script |
|----------|----------|--------|
| `update-sec-data.yml` | Daily (3AM UTC) | `fetch-sec-fs-datasets.cjs` |

The workflow downloads quarterly ZIP files from the `sec-data` release and processes them.

---

## Historical Statement Structure

Each bank's data file includes "as reported on face" presentations:

```json
{
  "rawData": {
    "historicalBalanceSheet": {
      "quarterly": [
        {
          "period": "Q3 2024",
          "filingDate": "2024-11-01",
          "items": [
            { "tag": "Assets", "label": "Total assets", "line": 10, "value": 4200000000000 }
          ]
        }
      ],
      "annual": [...],
      "canonicalItems": {
        "quarterly": [...],
        "annual": [...]
      }
    },
    "historicalIncomeStatement": {...}
  }
}
```
