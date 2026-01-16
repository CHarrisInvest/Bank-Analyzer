# SEC Financial Statement Data Set - Concept Mapping

This document maps SEC EDGAR XBRL concepts to the calculated metrics used in Bank Analyzer.

## Data Sources

Bank Analyzer supports **two data sources** from SEC EDGAR:

### 1. SEC Financial Statement Data Sets (Recommended)

**URL:** https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets

**Script:** `scripts/fetch-sec-fs-datasets.cjs`

This is the **recommended** data source because:
- Contains ONLY data from **primary financial statements** (as rendered by SEC)
- Higher accuracy and consistency
- Curated by SEC for research use
- Bulk download reduces API calls

**Files in quarterly ZIP:**
| File | Description |
|------|-------------|
| `sub.txt` | Submission metadata (CIK, company name, filing info) |
| `num.txt` | Numeric values (tag, value, date, quarters) |
| `tag.txt` | XBRL tag definitions |
| `pre.txt` | Presentation linkbase |

### 2. Company Facts API (Legacy)

**URL:** `https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json`

**Script:** `scripts/fetch-sec-data.cjs`

This API contains ALL XBRL data including notes and supplementary schedules,
which can lead to data quality issues.

---

## Output Files

| File | Description |
|------|-------------|
| `public/data/banks.json` | Calculated metrics for all banks |
| `public/data/sec-raw-data.json` | Raw SEC values for audit trail (new) |
| `public/data/bank-list.json` | Bank CIK/ticker mapping |

---

## XBRL Concepts Extracted

### Balance Sheet (Point-in-Time)

| XBRL Concept | Unit | Used For |
|--------------|------|----------|
| `Assets` | USD | Total Assets, ROAA, Deposits/Assets |
| `StockholdersEquity` | USD | Total Equity, ROE, Book Value |
| `StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest` | USD | Fallback for Equity |
| `Deposits` | USD | Deposits/Assets ratio |
| `DepositsDomestic` | USD | Fallback for Deposits |
| `Liabilities` | USD | Total Liabilities |
| `CommonStockSharesOutstanding` | shares | Per-share calculations |
| `CashAndCashEquivalentsAtCarryingValue` | USD | Cash position |
| `CashAndDueFromBanks` | USD | Fallback for Cash |
| `LoansAndLeasesReceivableNetReportedAmount` | USD | Loans |

### Income Statement (TTM)

| XBRL Concept | Unit | Used For |
|--------------|------|----------|
| `NetIncomeLoss` | USD | Net Income, ROE, ROAA |
| `ProfitLoss` | USD | Fallback for Net Income |
| `NetIncomeLossAvailableToCommonStockholdersBasic` | USD | Fallback |
| `EarningsPerShareBasic` | USD/shares | EPS, Graham Number |
| `EarningsPerShareDiluted` | USD/shares | Fallback for EPS |
| `InterestIncomeExpenseNet` | USD | Efficiency Ratio |
| `NetInterestIncome` | USD | Fallback for NII |
| `NoninterestIncome` | USD | Efficiency Ratio |
| `NoninterestExpense` | USD | Efficiency Ratio |
| `OperatingExpenses` | USD | Fallback |

### Dividend Concepts (TTM)

| XBRL Concept | Unit | Used For |
|--------------|------|----------|
| `CommonStockDividendsPerShareDeclared` | USD/shares | TTM DPS |
| `CommonStockDividendsPerShareCashPaid` | USD/shares | Fallback |
| `PaymentsOfDividendsCommonStock` | USD | Total dividends |
| `PaymentsOfDividends` | USD | Fallback |

---

## SEC Financial Statement Data Sets Structure

### num.txt (Numeric Data)

| Column | Description |
|--------|-------------|
| `adsh` | Accession number (unique filing ID) |
| `tag` | XBRL concept name |
| `version` | Taxonomy version |
| `ddate` | Data date (YYYYMMDD) |
| `qtrs` | Number of quarters (0=point-in-time, 1=quarterly, 4=annual) |
| `uom` | Unit of measure (USD, shares, etc.) |
| `value` | Numeric value |

### sub.txt (Submission Data)

| Column | Description |
|--------|-------------|
| `adsh` | Accession number |
| `cik` | Company CIK |
| `name` | Company name |
| `sic` | SIC code |
| `form` | Filing type (10-K, 10-Q) |
| `period` | Period end date |
| `fy` | Fiscal year |
| `fp` | Fiscal period (Q1, Q2, Q3, FY) |
| `filed` | Filing date |

---

## TTM Calculation Logic

### For Income Statement Items

1. **If most recent filing is 10-K (annual):** Use value directly (qtrs=4)
2. **If most recent filing is 10-Q:** Sum last 4 quarters (qtrs=1)

```
TTM = Q1 + Q2 + Q3 + Q4

Where quarterly values have qtrs=1 in num.txt
```

### For Balance Sheet Items

Use most recent point-in-time value (qtrs=0) from 10-K or 10-Q.

---

## Calculated Metrics

### Balance Sheet Derived

| Metric | Formula |
|--------|---------|
| Book Value Per Share | `Equity / Shares` |

### Profitability Ratios

| Metric | Formula |
|--------|---------|
| ROE % | `NetIncome(TTM) / AvgEquity × 100` |
| ROAA % | `NetIncome(TTM) / AvgAssets × 100` |

**Note:** Return ratios use 5-point average balance sheet values per FFIEC UBPR methodology.

### Bank-Specific Ratios

| Metric | Formula | Typical Range |
|--------|---------|---------------|
| Efficiency Ratio % | `NIE / (NII + NonintIncome) × 100` | 50-70% |
| Deposits/Assets % | `Deposits / Assets × 100` | 70-85% |
| Equity/Assets % | `Equity / Assets × 100` | 8-12% |

### Graham Value Metrics

| Metric | Formula |
|--------|---------|
| Graham Number | `√(22.5 × EPS × BVPS)` |
| Graham MoS ($) | `GrahamNumber - Price` |
| Graham MoS (%) | `(GrahamNumber - Price) / Price × 100` |

---

## Audit Trail: sec-raw-data.json

The new `sec-raw-data.json` file stores raw SEC values for verification:

```json
{
  "metadata": {
    "source": "SEC Financial Statement Data Sets",
    "url": "https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets",
    "quartersProcessed": ["2025Q3", "2025Q2", "2025Q1", "2024Q4"],
    "generatedAt": "2026-01-14T21:00:00.000Z"
  },
  "banks": {
    "0000040729": {
      "ticker": "ALLY",
      "companyName": "Ally Financial Inc.",
      "rawData": {
        "balanceSheet": {
          "Assets": {
            "value": 188779000000,
            "ddate": "20250930",
            "qtrs": 0,
            "form": "10-Q",
            "fp": "Q3"
          },
          "CommonStockSharesOutstanding": {
            "value": 303300000,
            "ddate": "20250930",
            "qtrs": 0,
            "form": "10-Q"
          }
        },
        "incomeStatement": {
          "NetIncomeLoss": {
            "value": -316000000,
            "date": "20250930",
            "method": "sum-4Q",
            "details": [...]
          }
        }
      },
      "submissions": [
        {"adsh": "0000040729-24-000123", "form": "10-Q", "period": "20250930"}
      ]
    }
  }
}
```

---

## Running the Scripts

### Fetch from SEC Financial Statement Data Sets (Recommended)

```bash
node scripts/fetch-sec-fs-datasets.cjs
```

This will:
1. Download quarterly ZIP files from SEC
2. Parse sub.txt and num.txt
3. Filter for bank CIKs
4. Calculate metrics
5. Save to `banks.json` and `sec-raw-data.json`

### Fetch from Company Facts API (Legacy)

```bash
node scripts/fetch-sec-data.cjs
```

### Inspect Raw Data for a Bank

```bash
node scripts/inspect-bank-data.cjs ALLY
```

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

## GitHub Actions Workflows

| Workflow | Schedule | Script |
|----------|----------|--------|
| `fetch-fs-datasets.yml` | Weekly (Sat 3AM UTC) | `fetch-sec-fs-datasets.cjs` |
| `fetch-data.yml` | Daily (2AM UTC) | `fetch-sec-data.cjs` |

The FS Data Sets workflow is recommended for production use.
