# SEC Company Facts API - Concept Mapping

This document maps SEC EDGAR XBRL concepts to the calculated metrics used in BankSift.

## Data Source

BankSift uses the **SEC EDGAR Company Facts API** to fetch financial data.

### SEC Company Facts API

**URL:** `https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json`

**Bulk Download:** `https://www.sec.gov/Archives/edgar/daily-index/xbrl/companyfacts.zip`

**Script:** `scripts/fetch-sec-company-facts.cjs`

**Advantages:**
- Includes **DEI namespace** (EntityCommonStockSharesOutstanding on cover page)
- Complete historical data per company
- Real-time updates available
- No quarterly ZIP file management

**Required Environment Variable:**
```bash
export SEC_USER_AGENT="Your Company Name admin@example.com"
```

---

## Output Files

| File | Description |
|------|-------------|
| `public/data/banks.json` | Calculated metrics for all banks |
| `public/data/sec-raw-data.json` | Summary raw data for audit trail |
| `public/data/company-facts/` | Full Company Facts JSON per bank |
| `public/data/bank-list.json` | Bank CIK/ticker mapping |

---

## XBRL Concepts Extracted

### DEI Namespace (Document & Entity Information)

| XBRL Concept | Unit | Used For |
|--------------|------|----------|
| `EntityCommonStockSharesOutstanding` | shares | Primary shares source (cover page) |
| `EntityPublicFloat` | USD | Public float |

### Balance Sheet (Point-in-Time)

| XBRL Concept | Unit | Used For |
|--------------|------|----------|
| `Assets` | USD | Total Assets, ROAA, Deposits/Assets |
| `StockholdersEquity` | USD | Total Equity, ROE, Book Value |
| `StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest` | USD | Fallback for Equity |
| `Deposits` | USD | Deposits/Assets ratio |
| `DepositsDomestic` | USD | Fallback for Deposits |
| `Liabilities` | USD | Total Liabilities |
| `CommonStockSharesOutstanding` | shares | Fallback for shares (balance sheet) |
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

## Company Facts API Structure

The API returns data structured by namespace and concept:

```json
{
  "cik": 18255,
  "entityName": "JPMORGAN CHASE & CO",
  "facts": {
    "dei": {
      "EntityCommonStockSharesOutstanding": {
        "label": "Entity Common Stock, Shares Outstanding",
        "units": {
          "shares": [
            {
              "end": "2024-09-30",
              "val": 2850000000,
              "accn": "0000019617-24-000123",
              "fy": 2024,
              "fp": "Q3",
              "form": "10-Q",
              "filed": "2024-11-01"
            }
          ]
        }
      }
    },
    "us-gaap": {
      "Assets": {
        "label": "Assets",
        "units": {
          "USD": [
            {
              "end": "2024-09-30",
              "val": 4200000000000,
              "start": null,
              "accn": "...",
              "fy": 2024,
              "fp": "Q3",
              "form": "10-Q",
              "filed": "2024-11-01"
            }
          ]
        }
      }
    }
  }
}
```

### Key Fields

| Field | Description |
|-------|-------------|
| `val` | Numeric value |
| `end` | Period end date (YYYY-MM-DD) |
| `start` | Period start date (null for point-in-time) |
| `form` | Filing type (10-K, 10-Q) |
| `fy` | Fiscal year |
| `fp` | Fiscal period (Q1, Q2, Q3, FY) |
| `filed` | Filing date |
| `accn` | Accession number |

---

## Period Length Inference

The Company Facts API doesn't have an explicit `qtrs` field. We infer it:

| Concept Type | `start` Field | Inferred Period |
|--------------|---------------|-----------------|
| Balance sheet | null | Point-in-time (qtrs=0) |
| Income/cash flow | present | Duration-based |

**Duration Classification:**
- ≤100 days → Quarterly (qtrs=1)
- 101-200 days → Semi-annual (qtrs=2)
- 201-300 days → 9 months (qtrs=3)
- >300 days → Annual (qtrs=4)

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
| Book Value Per Share | `Equity / Shares` |

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

### Graham Value Metrics

| Metric | Formula |
|--------|---------|
| Graham Number | `√(22.5 × EPS × BVPS)` |
| Graham MoS ($) | `GrahamNumber - Price` |
| Graham MoS (%) | `(GrahamNumber - Price) / Price × 100` |

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

### Fetch Using Per-Company API

```bash
export SEC_USER_AGENT="Your Company Name admin@example.com"
node scripts/fetch-sec-company-facts.cjs
```

### Fetch Using Bulk Download (Recommended)

```bash
export SEC_USER_AGENT="Your Company Name admin@example.com"
node scripts/fetch-sec-company-facts.cjs --bulk
```

This will:
1. Download companyfacts.zip (~2GB)
2. Extract and process bank company facts
3. Store full JSON per bank in `public/data/company-facts/`
4. Calculate metrics
5. Save to `banks.json` and `sec-raw-data.json`

---

## GitHub Actions Workflow

| Workflow | Schedule | Script |
|----------|----------|--------|
| `update-sec-data.yml` | Daily (3AM UTC) | `fetch-sec-company-facts.cjs --bulk` |

**Required Secret:** `SEC_USER_AGENT` - Your contact info for SEC API access.

---

## Reversion Plan

If issues arise with the Company Facts API, see `docs/reversion-plan-sec-fs-datasets.md` for instructions to revert to the SEC Financial Statement Data Sets approach.
