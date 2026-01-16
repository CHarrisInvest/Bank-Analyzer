# Migration Plan: SEC Financial Statement Data Sets → Company Facts API

## Overview

This document outlines the migration plan from SEC Financial Statement Data Sets to the SEC EDGAR Company Facts API to improve data coverage, particularly for shares outstanding.

**Current State:** `scripts/fetch-sec-fs-datasets.cjs` processes quarterly ZIP files from SEC Financial Statement Data Sets
**Target State:** New script using SEC Company Facts API with bulk download

---

## Motivation

### Problem
79 banks (22%) are missing `sharesOutstanding` data because:
- SEC Financial Statement Data Sets only include **primary financial statements**
- `dei:EntityCommonStockSharesOutstanding` (cover page) is **NOT included**
- Only `us-gaap:CommonStockSharesOutstanding` (balance sheet) is available, and not all banks tag it

### Solution
SEC Company Facts API includes **both DEI and US-GAAP namespaces**:
- `facts.dei.EntityCommonStockSharesOutstanding` - Cover page (required, high coverage)
- `facts.us-gaap.CommonStockSharesOutstanding` - Balance sheet (fallback)

---

## Reversion Strategy

### Yes, reversion is fully supported

| Approach | Description |
|----------|-------------|
| **Keep existing script** | Rename to `fetch-sec-fs-datasets.cjs.backup` or keep as-is |
| **New script** | Create `fetch-sec-company-facts.cjs` as separate file |
| **Same output format** | Both scripts produce identical `banks.json` structure |
| **Feature flag** | Add `--source=api` or `--source=datasets` flag |
| **GitHub Actions** | Can switch between scripts via workflow parameter |

### Reversion Steps
```bash
# To revert, simply run the original script:
node scripts/fetch-sec-fs-datasets.cjs

# Or update GitHub Actions workflow to use original script
```

---

## Architecture

### Current Architecture
```
GitHub Actions
    ↓
Download quarterly ZIPs from SEC
    ↓
scripts/fetch-sec-fs-datasets.cjs
    ↓
Process sub.txt + num.txt
    ↓
Filter: coreg=NULL, segments=NULL
    ↓
Calculate metrics (TTM, averages, ratios)
    ↓
Output: banks.json, sec-raw-data.json
```

### Target Architecture
```
GitHub Actions
    ↓
Download companyfacts.zip from SEC (or per-CIK API calls)
    ↓
scripts/fetch-sec-company-facts.cjs (NEW)
    ↓
Process JSON per company
    ↓
Filter: use frame attribute OR filter by form type
    ↓
Calculate metrics (same logic, adapted field names)
    ↓
Output: banks.json, sec-raw-data.json (same format)
```

---

## Field Mapping

### Data Fields

| Current (FS Data Sets) | Company Facts API | Transformation |
|------------------------|-------------------|----------------|
| `tag` | JSON path | `facts.{namespace}.{tag}` |
| `value` | `val` | Direct mapping |
| `ddate` | `end` | Direct mapping (YYYYMMDD → YYYY-MM-DD) |
| `qtrs` | *Inferred* | See "Period Length Inference" below |
| `form` | `form` | Direct mapping |
| `fy` | `fy` | Direct mapping |
| `fp` | `fp` | Direct mapping (Q1, Q2, Q3, FY) |
| `filed` | `filed` | Direct mapping |
| `coreg` | *Not available* | See "Consolidated Data" below |
| `uom` | `units` key | USD, shares, etc. |

### Period Length Inference (qtrs field)

The `qtrs` field is critical for distinguishing:
- `qtrs=0` → Point-in-time (balance sheet items)
- `qtrs=1` → Quarterly period (Q1, Q2, Q3 income)
- `qtrs=4` → Annual period (10-K or TTM)

**Inference Logic:**
```javascript
function inferQtrs(fact, concept) {
  // Balance sheet items are always point-in-time
  if (isBalanceSheetConcept(concept)) {
    return 0;
  }

  // Income statement items
  if (fact.fp === 'FY') {
    return 4;  // Annual
  }

  // For Q1-Q4, check if it's a cumulative or quarterly value
  // by comparing start/end dates or using frame attribute
  if (fact.frame && fact.frame.includes('I')) {
    return 0;  // Instant
  }

  // Calculate from date range if available
  if (fact.start && fact.end) {
    const months = monthsBetween(fact.start, fact.end);
    if (months <= 3) return 1;
    if (months <= 6) return 2;
    if (months <= 9) return 3;
    return 4;
  }

  // Default based on fiscal period
  return fact.fp.startsWith('Q') ? 1 : 4;
}
```

### Consolidated Data Handling

**Current approach:** Filter `coreg=NULL AND segments=NULL`

**API approach options:**

1. **Rely on default behavior** - API appears to return consolidated totals by default (users report difficulty getting segment data)

2. **Filter by form type** - Only use facts from 10-K and 10-Q forms

3. **Use frame attribute** - The `frame` field indicates the reporting period and filters to one fact per period

4. **Validate with test cases** - Compare API output to known values for a few banks

**Recommendation:** Start with option 1+2, validate with test cases, add filtering if needed.

---

## Logic Preservation

### TTM Calculation
**Status:** ✅ Fully portable

Current logic sums 4 quarters or uses annual value. Same logic applies:
```javascript
// Unchanged - just different field names
const ttmValue = sumQuarters(quarterlyData, 4) || annualValue;
```

### 5-Point Averaging (FFIEC Standard)
**Status:** ✅ Fully portable

Current logic collects 5 point-in-time values. Same logic applies:
```javascript
// Unchanged - collect 5 most recent qtrs=0 values
const avgValue = average(last5PointInTimeValues);
```

### XBRL Tag Fallbacks
**Status:** ✅ Fully portable

Current fallback chains work identically:
```javascript
// Current
const equity = getLatestPointInTime(concepts['StockholdersEquity']) ||
               getLatestPointInTime(concepts['StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest']);

// API version - same pattern
const equity = getLatestValue(facts['us-gaap']['StockholdersEquity']) ||
               getLatestValue(facts['us-gaap']['StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest']);
```

### Data Quality Validation
**Status:** ✅ Fully portable

Outlier thresholds remain unchanged:
```javascript
// Unchanged
outlierThresholds: {
  efficiencyRatio: { min: 20, max: 150 },
  depositsToAssets: { min: 10, max: 100 },
  equityToAssets: { min: 1, max: 50 },
  roe: { min: -100, max: 100 },
  roaa: { min: -10, max: 10 },
}
```

---

## Implementation Phases

### Phase 1: Proof of Concept (Low Risk)
- [ ] Download sample companyfacts.zip
- [ ] Parse JSON for 5-10 test banks (ALLY, ABCB, JPM, etc.)
- [ ] Verify DEI namespace contains EntityCommonStockSharesOutstanding
- [ ] Compare values to current banks.json output
- [ ] Validate consolidated data behavior

### Phase 2: Core Implementation
- [ ] Create `fetch-sec-company-facts.cjs` (new file)
- [ ] Implement field mapping layer
- [ ] Implement period length inference (`qtrs` equivalent)
- [ ] Port TTM calculation logic
- [ ] Port averaging logic
- [ ] Port tag fallback chains
- [ ] Port data quality validation

### Phase 3: Integration
- [ ] Generate banks.json with new script
- [ ] Compare output to existing banks.json
- [ ] Verify all 354 banks present
- [ ] Verify shares coverage improved (target: <20 nulls)
- [ ] Verify no regressions in other fields

### Phase 4: Deployment
- [ ] Update GitHub Actions workflow
- [ ] Add source selection parameter
- [ ] Test in CI/CD pipeline
- [ ] Document reversion procedure
- [ ] Deploy to production

---

## Data Source Comparison

### Bulk Download Options

| Source | URL | Size | Update Frequency |
|--------|-----|------|------------------|
| FS Data Sets | SEC quarterly ZIPs | ~50MB/quarter | Quarterly |
| Company Facts | companyfacts.zip | ~2GB | Daily |
| Per-CIK API | data.sec.gov/api/xbrl/companyfacts/CIK{cik}.json | ~1MB/bank | Real-time |

### Recommendation
Use **companyfacts.zip** for bulk processing (similar to current approach), with fallback to per-CIK API for updates or debugging.

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| API structure changes | Low | High | Version pin, monitor SEC announcements |
| Missing coreg filtering | Medium | Medium | Validate with test cases, add filtering if needed |
| qtrs inference errors | Medium | Medium | Extensive testing, compare to known values |
| Performance degradation | Low | Low | Bulk download mitigates API rate limits |
| Data quality regression | Low | High | Automated comparison tests |

---

## Success Criteria

1. **Shares coverage:** Reduce null sharesOutstanding from 79 to <20
2. **No regressions:** All other fields match or improve vs current output
3. **Revertible:** Can switch back to FS Data Sets in <5 minutes
4. **Performance:** Data refresh completes in <10 minutes
5. **Maintainability:** Clear separation between data fetching and metric calculation

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `scripts/fetch-sec-company-facts.cjs` | Create | New API-based data fetcher |
| `scripts/fetch-sec-fs-datasets.cjs` | Keep | Original script (backup/reversion) |
| `.github/workflows/update-data.yml` | Modify | Add source selection parameter |
| `docs/sec-data-mapping.md` | Update | Document both approaches |
| `package.json` | Maybe | Add any new dependencies |

---

## Timeline Estimate

| Phase | Tasks | Effort |
|-------|-------|--------|
| Phase 1: POC | Download, parse, validate | 2-4 hours |
| Phase 2: Core | New script implementation | 4-8 hours |
| Phase 3: Integration | Testing and comparison | 2-4 hours |
| Phase 4: Deployment | CI/CD and documentation | 1-2 hours |
| **Total** | | **9-18 hours** |

---

## Appendix: Sample API Response

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
              "accn": "0000019617-24-000123",
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
