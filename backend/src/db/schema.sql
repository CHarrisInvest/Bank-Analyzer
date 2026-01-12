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

    -- SEC filing derived metrics
    total_assets BIGINT,
    total_equity BIGINT,
    tangible_book_value BIGINT,
    net_income BIGINT,
    shares_outstanding BIGINT,
    eps DECIMAL(12, 4), -- Earnings per share
    book_value_per_share DECIMAL(12, 4),
    tangible_book_value_per_share DECIMAL(12, 4),

    -- Calculated ratios
    pni DECIMAL(12, 4), -- Price to Net Income (P/E ratio)
    ptbvps DECIMAL(12, 4), -- Price to Tangible Book Value per Share
    mkt_cap_se DECIMAL(12, 4), -- Market Cap to Shareholder Equity
    ni_tbv DECIMAL(12, 4), -- Net Income to Tangible Book Value
    roe DECIMAL(12, 4), -- Return on Equity (%)
    rota DECIMAL(12, 4), -- Return on Total Assets (%)

    -- Graham value investing metrics
    graham_number DECIMAL(12, 4),
    graham_mos DECIMAL(12, 4), -- Margin of Safety in dollars
    graham_mos_pct DECIMAL(12, 4), -- Margin of Safety as percentage

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
    m.pni,
    m.ptbvps,
    m.mkt_cap_se,
    m.ni_tbv,
    m.roe,
    m.rota,
    m.graham_number,
    m.graham_mos,
    m.graham_mos_pct,
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
