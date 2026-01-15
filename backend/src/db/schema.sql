-- Bank Analyzer Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS bank_metrics CASCADE;
DROP TABLE IF EXISTS banks CASCADE;

-- Banks table - stores basic bank information
CREATE TABLE banks (
    id SERIAL PRIMARY KEY,
    ticker VARCHAR(10) UNIQUE NOT NULL,
    cik VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    exchange VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bank metrics table - stores calculated financial metrics
CREATE TABLE bank_metrics (
    id SERIAL PRIMARY KEY,
    bank_id INTEGER REFERENCES banks(id) ON DELETE CASCADE,

    -- Price and market data
    price DECIMAL(12, 2),
    market_cap BIGINT, -- In dollars

    -- ========================================================================
    -- BALANCE SHEET - ASSETS (Point-in-Time)
    -- ========================================================================
    total_assets BIGINT,
    cash_and_due_from_banks BIGINT, -- us-gaap:CashAndDueFromBanks
    interest_bearing_deposits_in_banks BIGINT, -- us-gaap:InterestBearingDepositsInBanks
    afs_securities BIGINT, -- us-gaap:AvailableForSaleSecuritiesDebt
    htm_securities BIGINT, -- us-gaap:HeldToMaturitySecurities
    loans BIGINT, -- us-gaap:LoansAndLeasesReceivableNetReportedAmount
    allowance_for_credit_losses BIGINT, -- us-gaap:AllowanceForLoanAndLeaseLosses
    premises_and_equipment BIGINT, -- us-gaap:PremisesAndEquipmentNet

    -- ========================================================================
    -- BALANCE SHEET - LIABILITIES & EQUITY (Point-in-Time)
    -- ========================================================================
    total_liabilities BIGINT, -- us-gaap:Liabilities
    deposits BIGINT, -- us-gaap:Deposits
    short_term_borrowings BIGINT, -- us-gaap:ShortTermBorrowings
    long_term_debt BIGINT, -- us-gaap:LongTermDebt
    total_equity BIGINT, -- us-gaap:StockholdersEquity
    goodwill BIGINT, -- us-gaap:Goodwill
    intangible_assets BIGINT, -- us-gaap:IntangibleAssetsNetExcludingGoodwill
    tangible_book_value BIGINT,
    tangible_assets BIGINT,
    tangible_common_equity BIGINT,

    -- ========================================================================
    -- INCOME STATEMENT (Annual/TTM values)
    -- ========================================================================
    interest_income BIGINT, -- us-gaap:InterestIncome
    interest_expense BIGINT, -- us-gaap:InterestExpense
    net_interest_income BIGINT, -- us-gaap:NetInterestIncome
    noninterest_income BIGINT, -- us-gaap:NoninterestIncome
    noninterest_expense BIGINT, -- us-gaap:NoninterestExpense
    provision_for_credit_losses BIGINT, -- us-gaap:ProvisionForLoanAndLeaseLosses
    pre_tax_income BIGINT, -- us-gaap:IncomeLossFromContinuingOperationsBeforeIncomeTaxes
    net_income BIGINT, -- us-gaap:NetIncomeLoss

    -- ========================================================================
    -- CASH FLOW (Annual values)
    -- ========================================================================
    operating_cash_flow BIGINT, -- us-gaap:NetCashProvidedByUsedInOperatingActivities

    -- ========================================================================
    -- CAPITAL / PER-SHARE
    -- ========================================================================
    shares_outstanding BIGINT, -- dei:EntityCommonStockSharesOutstanding
    eps DECIMAL(12, 4), -- us-gaap:EarningsPerShareBasic
    dividends_per_share DECIMAL(12, 4), -- us-gaap:CommonStockDividendsPerShareDeclared
    book_value_per_share DECIMAL(12, 4),
    tangible_book_value_per_share DECIMAL(12, 4),

    -- ========================================================================
    -- CALCULATED RATIOS
    -- ========================================================================
    pni DECIMAL(12, 4), -- Price to Net Income (P/E ratio)
    ptbvps DECIMAL(12, 4), -- Price to Tangible Book Value per Share
    mkt_cap_se DECIMAL(12, 4), -- Market Cap to Shareholder Equity
    ni_tbv DECIMAL(12, 4), -- Net Income to Tangible Book Value
    roe DECIMAL(12, 4), -- Return on Equity (%)
    roaa DECIMAL(12, 4), -- Return on Average Assets (%)
    rota DECIMAL(12, 4), -- Return on Tangible Assets (%)
    rotce DECIMAL(12, 4), -- Return on Tangible Common Equity (%)

    -- Graham value investing metrics
    graham_number DECIMAL(12, 4),
    graham_mos DECIMAL(12, 4), -- Margin of Safety in dollars
    graham_mos_pct DECIMAL(12, 4), -- Margin of Safety as percentage

    -- Bank-specific ratios
    efficiency_ratio DECIMAL(12, 4), -- Noninterest Expense / (Net Interest Income + Noninterest Income)
    acl_to_loans DECIMAL(12, 4), -- Allowance for Credit Losses / Total Loans
    provision_to_avg_loans DECIMAL(12, 4), -- Provision for Credit Losses / Average Loans
    loans_to_assets DECIMAL(12, 4), -- Total Loans / Total Assets
    deposits_to_assets DECIMAL(12, 4), -- Deposits / Total Assets
    loans_to_deposits DECIMAL(12, 4), -- Total Loans / Total Deposits (LDR)
    cash_securities_to_assets DECIMAL(12, 4), -- (Cash + AFS + HTM) / Total Assets
    equity_to_assets DECIMAL(12, 4), -- Stockholders' Equity / Total Assets
    tce_to_ta DECIMAL(12, 4), -- Tangible Common Equity / Tangible Assets
    net_interest_margin DECIMAL(12, 4), -- Net Interest Income / Earning Assets

    -- Metadata
    data_date DATE NOT NULL, -- Date of the financial data
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Ensure one metrics record per bank per date
    UNIQUE(bank_id, data_date)
);

-- Create indexes for better query performance
CREATE INDEX idx_banks_ticker ON banks(ticker);
CREATE INDEX idx_banks_cik ON banks(cik);
CREATE INDEX idx_bank_metrics_bank_id ON bank_metrics(bank_id);
CREATE INDEX idx_bank_metrics_data_date ON bank_metrics(data_date);

-- Create a view for latest metrics (most commonly used query)
CREATE OR REPLACE VIEW latest_bank_metrics AS
SELECT
    b.ticker,
    b.name AS bank_name,
    b.exchange,
    m.price,
    m.market_cap,
    -- Balance Sheet - Assets
    m.total_assets,
    m.cash_and_due_from_banks,
    m.interest_bearing_deposits_in_banks,
    m.afs_securities,
    m.htm_securities,
    m.loans,
    m.allowance_for_credit_losses,
    m.premises_and_equipment,
    -- Balance Sheet - Liabilities & Equity
    m.total_liabilities,
    m.deposits,
    m.short_term_borrowings,
    m.long_term_debt,
    m.total_equity,
    m.goodwill,
    m.intangible_assets,
    m.tangible_book_value,
    m.tangible_assets,
    m.tangible_common_equity,
    -- Income Statement
    m.interest_income,
    m.interest_expense,
    m.net_interest_income,
    m.noninterest_income,
    m.noninterest_expense,
    m.provision_for_credit_losses,
    m.pre_tax_income,
    m.net_income,
    -- Cash Flow
    m.operating_cash_flow,
    -- Capital / Per-Share
    m.shares_outstanding,
    m.eps,
    m.dividends_per_share,
    m.book_value_per_share,
    m.tangible_book_value_per_share,
    -- Valuation Ratios
    m.pni,
    m.ptbvps,
    m.mkt_cap_se,
    m.ni_tbv,
    -- Performance Ratios
    m.roe,
    m.roaa,
    m.rota,
    m.rotce,
    -- Graham Metrics
    m.graham_number,
    m.graham_mos,
    m.graham_mos_pct,
    -- Bank-specific ratios
    m.efficiency_ratio,
    m.acl_to_loans,
    m.provision_to_avg_loans,
    m.loans_to_assets,
    m.deposits_to_assets,
    m.loans_to_deposits,
    m.cash_securities_to_assets,
    m.equity_to_assets,
    m.tce_to_ta,
    m.net_interest_margin,
    -- Metadata
    m.data_date,
    m.updated_at
FROM banks b
INNER JOIN bank_metrics m ON b.id = m.bank_id
INNER JOIN (
    SELECT bank_id, MAX(data_date) as max_date
    FROM bank_metrics
    GROUP BY bank_id
) latest ON m.bank_id = latest.bank_id AND m.data_date = latest.max_date
ORDER BY m.market_cap DESC;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_banks_updated_at BEFORE UPDATE ON banks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bank_metrics_updated_at BEFORE UPDATE ON bank_metrics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
