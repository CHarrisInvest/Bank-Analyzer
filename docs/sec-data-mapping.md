# SEC Financial Statement Data Set - Concept Mapping

This document maps SEC EDGAR XBRL concepts to the calculated metrics used in Bank Analyzer.

## Data Source

**SEC Financial Statement Data Sets**
URL: `https://data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json`

Only concepts from **Primary Financial Statements** are used:
- Balance Sheet
- Income Statement
- Cash Flow Statement

## Example: Ally Financial Inc. (ALLY)

**CIK:** 0000040729
**Most Recent Data:** 2025-09-30 (Q3 2025)
**TTM Method:** sum-4Q (Q4'24 + Q1'25 + Q2'25 + Q3'25)

---

## Balance Sheet Concepts (Point-in-Time)

These values represent the most recent balance sheet date (2025-09-30 for Ally).

| XBRL Concept | Taxonomy | Unit | Used For |
|--------------|----------|------|----------|
| `Assets` | us-gaap | USD | Total Assets, ROAA, Deposits/Assets, Equity/Assets |
| `StockholdersEquity` | us-gaap | USD | Total Equity, ROE, Book Value, Equity/Assets |
| `StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest` | us-gaap | USD | Fallback for Equity |
| `Deposits` | us-gaap | USD | Deposits/Assets ratio |
| `Goodwill` | us-gaap | USD | Tangible Book Value calculation |
| `IntangibleAssetsNetExcludingGoodwill` | us-gaap | USD | Tangible Book Value calculation |
| `PreferredStockValue` | us-gaap | USD | Tangible Common Equity calculation |
| `PreferredStockValueOutstanding` | us-gaap | USD | Fallback for Preferred Stock |
| `CommonStockSharesOutstanding` | us-gaap | shares | Per-share calculations |
| `EntityCommonStockSharesOutstanding` | dei | shares | Fallback for Shares Outstanding |
| `CashAndCashEquivalentsAtCarryingValue` | us-gaap | USD | Cash position |
| `Cash` | us-gaap | USD | Fallback for Cash |

---

## Income Statement Concepts (TTM - Period-Based)

These values are summed over the trailing twelve months.

| XBRL Concept | Taxonomy | Unit | Used For |
|--------------|----------|------|----------|
| `NetIncomeLoss` | us-gaap | USD | Net Income, ROE, ROAA, ROTA, ROTCE |
| `ProfitLoss` | us-gaap | USD | Fallback for Net Income |
| `NetIncomeLossAvailableToCommonStockholdersBasic` | us-gaap | USD | Fallback for Net Income |
| `EarningsPerShareBasic` | us-gaap | USD/shares | EPS, Graham Number |
| `EarningsPerShareDiluted` | us-gaap | USD/shares | Fallback for EPS |
| `InterestIncomeExpenseNet` | us-gaap | USD | Efficiency Ratio (revenue component) |
| `NetInterestIncome` | us-gaap | USD | Fallback for Net Interest Income |
| `NoninterestIncome` | us-gaap | USD | Efficiency Ratio (revenue component) |
| `NoninterestExpense` | us-gaap | USD | Efficiency Ratio (expense component) |
| `OperatingExpenses` | us-gaap | USD | Fallback for Noninterest Expense |

---

## Cash Flow Statement Concepts (TTM)

| XBRL Concept | Taxonomy | Unit | Used For |
|--------------|----------|------|----------|
| `NetCashProvidedByUsedInOperatingActivities` | us-gaap | USD | Operating Cash Flow |
| `NetCashProvidedByUsedInInvestingActivities` | us-gaap | USD | Investing Cash Flow |
| `NetCashProvidedByUsedInFinancingActivities` | us-gaap | USD | Financing Cash Flow |
| `PaymentsOfDividendsCommonStock` | us-gaap | USD | Total dividends paid |
| `PaymentsOfDividends` | us-gaap | USD | Fallback for dividends |

---

## Dividend Concepts (TTM)

| XBRL Concept | Taxonomy | Unit | Used For |
|--------------|----------|------|----------|
| `CommonStockDividendsPerShareDeclared` | us-gaap | USD/shares | TTM Dividend Per Share (primary) |
| `CommonStockDividendsPerShareCashPaid` | us-gaap | USD/shares | Fallback for DPS |
| `DividendsCommonStockCash` | us-gaap | USD | Total dividends (fallback) |
| `Dividends` | us-gaap | USD | Generic dividend total (fallback) |

---

## TTM Calculation Logic

### For Most Recent 10-Q Filing (Ally's case)

TTM = Q4(prior year) + Q1 + Q2 + Q3

Where Q4 is derived: `Q4 = Annual (10-K) - Q1 - Q2 - Q3`

**Example for Net Income:**
```
TTM Net Income = Q4'24(derived) + Q1'25 + Q2'25 + Q3'25
```

### Filing Periods

| Filing | Period (fp) | Fiscal Year (fy) | Period End Date |
|--------|-------------|------------------|-----------------|
| 10-Q | Q1 | 2025 | 2025-03-31 |
| 10-Q | Q2 | 2025 | 2025-06-30 |
| 10-Q | Q3 | 2025 | 2025-09-30 |
| 10-K | FY | 2024 | 2024-12-31 |

---

## Calculated Metrics Formulas

### From Balance Sheet Data

| Metric | Formula |
|--------|---------|
| **Tangible Book Value** | `StockholdersEquity - Goodwill - IntangibleAssets` |
| **Tangible Common Equity** | `StockholdersEquity - PreferredStock - Goodwill - IntangibleAssets` |
| **Tangible Assets** | `Assets - Goodwill - IntangibleAssets` |
| **Book Value Per Share** | `StockholdersEquity / SharesOutstanding` |
| **TBVPS** | `TangibleCommonEquity / SharesOutstanding` |
| **Deposits/Assets %** | `Deposits / Assets × 100` |
| **Equity/Assets %** | `StockholdersEquity / Assets × 100` |
| **TCE/TA %** | `TangibleCommonEquity / TangibleAssets × 100` |

### From Income Statement Data (TTM)

| Metric | Formula |
|--------|---------|
| **ROE %** | `NetIncome(TTM) / StockholdersEquity × 100` |
| **ROAA %** | `NetIncome(TTM) / AverageAssets × 100` |
| **ROTA %** | `NetIncome(TTM) / TangibleAssets × 100` |
| **ROTCE %** | `NetIncome(TTM) / TangibleCommonEquity × 100` |
| **NI/TBV** | `NetIncome(TTM) / TangibleBookValue` |
| **Efficiency Ratio %** | `NoninterestExpense(TTM) / (NetInterestIncome(TTM) + NoninterestIncome(TTM)) × 100` |

### Graham Value Metrics

| Metric | Formula |
|--------|---------|
| **Graham Number** | `√(22.5 × EPS × BVPS)` |
| **Graham MoS ($)** | `GrahamNumber - Price` |
| **Graham MoS (%)** | `(GrahamNumber - Price) / Price × 100` |

### Dividend Metrics

| Metric | Formula |
|--------|---------|
| **TTM Dividend Per Share** | Sum of 4 quarters of `CommonStockDividendsPerShareDeclared` |
| **Dividend Payout Ratio** | `TTM_DPS / TTM_EPS × 100` |

---

## SEC EDGAR JSON Response Structure

```json
{
  "cik": 40729,
  "entityName": "Ally Financial Inc.",
  "facts": {
    "us-gaap": {
      "Assets": {
        "label": "Assets",
        "description": "Sum of the carrying amounts...",
        "units": {
          "USD": [
            {
              "end": "2025-09-30",
              "val": 192500000000,
              "accn": "0000040729-24-000123",
              "fy": 2025,
              "fp": "Q3",
              "form": "10-Q",
              "filed": "2025-10-25"
            }
          ]
        }
      },
      "NetIncomeLoss": {
        "units": {
          "USD": [
            {
              "end": "2025-09-30",
              "val": -250000000,
              "fy": 2025,
              "fp": "Q3",
              "form": "10-Q"
            }
          ]
        }
      }
    },
    "dei": {
      "EntityCommonStockSharesOutstanding": {
        "units": {
          "shares": [...]
        }
      }
    }
  }
}
```

---

## Running the Data Inspector

To see raw SEC EDGAR values for any bank:

```bash
node scripts/inspect-bank-data.cjs ALLY
node scripts/inspect-bank-data.cjs JPM
node scripts/inspect-bank-data.cjs BAC
```

This will output all XBRL concepts with:
- Filing type (10-K, 10-Q)
- Fiscal period (Q1, Q2, Q3, FY)
- Fiscal year
- Period end date
- Filing date
- Raw value

---

## Data Quality Notes

1. **Efficiency Ratio for Ally**: Currently flagged as invalid (714.59% > 150% max)
   - This suggests Ally may report noninterest expense and income differently
   - The metric is nulled out to prevent misleading data

2. **Negative Net Income**: Ally had negative TTM net income as of Q3 2025
   - ROE, ROAA, ROTA, ROTCE are negative
   - Dividend payout ratio is N/A (can't calculate with negative earnings)

3. **Price Metrics**: Null because no price data source is configured
   - P/NI, PTBVPS, Market Cap metrics require stock price
