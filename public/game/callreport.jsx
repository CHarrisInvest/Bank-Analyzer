// Call Report tab — FFIEC-style two-column quarterly with refined hierarchy
const { palette: RP } = window.Theme;
const RBE = window.BankEngine;

function ReportRow({ label, value, indent = 0, total = false, dim = false, neg = false, bold = false }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between",
      padding: total ? "8px 0 4px" : "4px 0",
      borderTop: total ? `1px solid ${RP.line}` : "none",
      paddingLeft: indent * 14,
      fontSize: 12,
      fontWeight: total || bold ? 600 : 400,
      color: dim ? RP.textMute : neg ? RP.bad : RP.text,
    }}>
      <span>{label}</span>
      <span className="num" style={{ fontWeight: total || bold ? 700 : 500 }}>{value}</span>
    </div>
  );
}

function ReportSection({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
        color: RP.amber, paddingBottom: 6, borderBottom: `2px solid ${RP.amber}`,
        marginBottom: 6,
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function CallReportTab({ state, ratios }) {
  const bs = state.bs;
  const is = state.lastIS;
  const td = RBE.totalDeposits(bs.deposits);
  const ta = RBE.totalAssets(bs);
  const tl = RBE.totalLiabilities(bs);
  const eq = RBE.totalEquity(bs);
  const f$ = RBE.fmt$;
  const fpct = (v, d = 2) => v === null || v === undefined || isNaN(v) ? "—" : `${(v * 100).toFixed(d)}%`;

  return (
    <div className="tab-enter scroll-thin" style={{ padding: 14, height: "100%", overflowY: "auto" }}>
      {/* Title block */}
      <div data-coach="report-title" style={{ marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${RP.line}`, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="serif" style={{ fontSize: 26, lineHeight: 1, color: RP.text }}>
            Consolidated Reports of Condition and Income
          </div>
          <div style={{ fontSize: 12, color: RP.textMute, marginTop: 6 }}>
            FFIEC 051 · First Meridian Bank, NA · Charter #1893 · Confidential
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="label">Reporting Period</div>
          <div className="num" style={{ fontSize: 16, fontWeight: 600 }}>{window.Theme.quarterLabel(Math.max(1, state.quarter - 1)).label}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        {/* Schedule RC — Balance Sheet */}
        <div>
          <ReportSection title="Schedule RC — Balance Sheet">
            <div className="label" style={{ fontSize: 10, marginBottom: 4 }}>Assets</div>
            <ReportRow label="Cash and balances due" value={f$(bs.cash)} />
            <ReportRow label="Securities AFS" value={f$(bs.securitiesAFS)} indent={1} dim />
            <ReportRow label="Securities HTM" value={f$(bs.securitiesHTM)} indent={1} dim />
            <ReportRow label="Total Securities" value={f$(bs.securitiesAFS + bs.securitiesHTM)} bold />
            <ReportRow label="Loans, gross" value={f$(bs.loansGross)} />
            <ReportRow label="Less: ACL" value={`(${f$(bs.acl)})`} indent={1} dim />
            <ReportRow label="Loans, net" value={f$(bs.loansGross - bs.acl)} bold />
            <ReportRow label="Premises and fixed assets" value={f$(bs.premises)} dim />
            <ReportRow label="Other assets" value={f$(bs.otherAssets)} dim />
            <ReportRow label="Total Assets" value={f$(ta)} total />

            <div className="label" style={{ fontSize: 10, marginTop: 14, marginBottom: 4 }}>Liabilities</div>
            <ReportRow label="Noninterest-bearing deposits" value={f$(bs.deposits.noninterest)} />
            <ReportRow label="Interest checking" value={f$(bs.deposits.interestChecking)} dim />
            <ReportRow label="Savings and money market" value={f$(bs.deposits.savingsMM)} dim />
            <ReportRow label="Time deposits" value={f$(bs.deposits.timeDeposits)} dim />
            <ReportRow label="Total deposits" value={f$(td)} bold />
            <ReportRow label="Brokered CDs" value={f$(bs.brokeredCDs || 0)} />
            <ReportRow label="FHLB advances" value={f$(bs.borrowingsFHLB)} />
            <ReportRow label="Subordinated debt" value={f$(bs.subDebt)} />
            <ReportRow label="Other liabilities" value={f$(bs.otherLiab)} dim />
            <ReportRow label="Total Liabilities" value={f$(tl)} total />

            <div className="label" style={{ fontSize: 10, marginTop: 14, marginBottom: 4 }}>Equity</div>
            <ReportRow label="Common stock + paid-in capital" value={f$(bs.commonEquity)} />
            <ReportRow label="Retained earnings" value={f$(bs.retainedEarnings)} />
            <ReportRow label="AOCI" value={f$(bs.aoci)} neg={bs.aoci < 0} />
            <ReportRow label="Total Equity" value={f$(eq)} total />

            <div style={{ height: 8 }} />
            <ReportRow label="Memo: Shares outstanding (000s)" value={`${(bs.sharesOutstanding).toFixed(0)}K`} dim />
            <ReportRow label="Memo: Book value per share" value={`$${(eq / bs.sharesOutstanding).toFixed(2)}`} dim />
          </ReportSection>
        </div>

        <div>
          <ReportSection title="Schedule RI — Income Statement">
            <ReportRow label="Interest on loans" value={f$(is.interestIncome * (is.avgLoans * is.loanYield) / 4 / Math.max(0.001, is.interestIncome))} indent={1} dim />
            <ReportRow label="Interest on securities + cash" value={f$(is.interestIncome - (is.avgLoans * is.loanYield) / 4)} indent={1} dim />
            <ReportRow label="Total Interest Income" value={f$(is.interestIncome)} bold />
            <ReportRow label="Interest expense — deposits" value={f$(is.avgDeposits * is.depCost / 4)} indent={1} dim />
            <ReportRow label="Interest expense — borrowings" value={f$(is.interestExpense - is.avgDeposits * is.depCost / 4)} indent={1} dim />
            <ReportRow label="Total Interest Expense" value={f$(is.interestExpense)} bold />
            <ReportRow label="Net Interest Income" value={f$(is.nii)} total />
            <ReportRow label="Provision for Credit Losses" value={f$(is.provision)} />
            {(is.sbaGain ?? 0) > 0 && <ReportRow label="Gain on sale — SBA" value={f$(is.sbaGain)} indent={1} dim />}
            {(is.mortGain ?? 0) > 0 && <ReportRow label="Gain on sale — mortgage" value={f$(is.mortGain)} indent={1} dim />}
            <ReportRow label="Noninterest Income" value={f$(is.nonintIncome)} bold />
            <ReportRow label="Fixed (premises + systems + base)" value={f$(is.nonintExpenseFixed ?? 0)} indent={1} dim />
            <ReportRow label="Variable (scales with assets + events)" value={f$(is.nonintExpenseVariable ?? (is.nonintExpense - (is.nonintExpenseFixed ?? 0)))} indent={1} dim />
            {(is.depositAdSpend ?? 0) > 0 && <ReportRow label="of which: deposit marketing" value={f$(is.depositAdSpend)} indent={2} dim />}
            <ReportRow label="Noninterest Expense" value={f$(is.nonintExpense)} bold />
            <ReportRow label="Pre-tax Income" value={f$(is.pretax)} bold />
            <ReportRow label="Income Tax (21%)" value={f$(is.tax)} dim />
            <ReportRow label="Net Income" value={f$(is.netIncome)} total />

            <div className="label" style={{ fontSize: 10, marginTop: 14, marginBottom: 4 }}>Capital Distributions</div>
            <ReportRow label="Cash dividends paid" value={f$(is.dividendsPaid)} />
            <ReportRow label="Share repurchases" value={f$(is.repurchases)} />
            {is.repurchases > 0 && is.repurchasePrice && (
              <ReportRow label="Repurchase price / shares (K)" value={`$${is.repurchasePrice.toFixed(2)} / ${(is.repurchaseShares || 0).toFixed(1)}`} dim />
            )}
            {is.equityIssuanceGross > 0 && (
              <>
                <ReportRow label="Equity issuance (gross)" value={f$(is.equityIssuanceGross)} />
                <ReportRow label="Issuance price / shares (K)" value={`$${(is.equityIssuancePrice || 0).toFixed(2)} / ${(is.equityIssuanceShares || 0).toFixed(1)}`} dim />
              </>
            )}

            <div className="label" style={{ fontSize: 10, marginTop: 14, marginBottom: 4 }}>Credit Quality</div>
            <ReportRow label="Nonperforming loans" value={f$(bs.npl)} />
            <ReportRow label="Gross charge-offs" value={f$(is.grossChargeOffs)} dim />
            <ReportRow label="Net charge-offs" value={f$(is.netChargeOffs)} />
            <ReportRow label="ACL / Loans" value={fpct(bs.acl / bs.loansGross)} dim />
            <ReportRow label="ACL / NPL coverage" value={`${(bs.acl / Math.max(1, bs.npl)).toFixed(2)}x`} dim />
          </ReportSection>

          <ReportSection title="Schedule RC-R — Regulatory Capital">
            <ReportRow label="CET1 Ratio" value={fpct(ratios.cet1)} bold />
            <ReportRow label="Tier 1 Leverage Ratio" value={fpct(ratios.tier1Lev)} />
            <ReportRow label="Total Capital Ratio" value={fpct(ratios.totalCapRatio)} />
            <ReportRow label="Tangible Common Equity / TA" value={fpct(ratios.tce)} />
            <ReportRow label="Risk-Weighted Assets" value={f$(ratios.rwa)} dim />

            <div className="label" style={{ fontSize: 10, marginTop: 14, marginBottom: 4 }}>Performance</div>
            <ReportRow label="Net Interest Margin" value={fpct(ratios.nim)} bold />
            <ReportRow label="Return on Assets" value={fpct(ratios.roa)} />
            <ReportRow label="Return on Equity" value={fpct(ratios.roe)} />
            <ReportRow label="Efficiency Ratio" value={fpct(ratios.efficiency, 1)} />
            <ReportRow label="Loan-to-Deposit Ratio" value={`${ratios.ltd.toFixed(2)}x`} />
            <ReportRow label="On-hand Liquidity" value={fpct(ratios.onHandLiq, 1)} />

            <div className="label" style={{ fontSize: 10, marginTop: 14, marginBottom: 4 }}>Concentration Memos</div>
            {(() => {
              const indShare = bs.loansGross > 0 ? (bs.loansIndirect || 0) / bs.loansGross : 0;
              const wholesale = (bs.borrowingsFHLB || 0) + (bs.brokeredCDs || 0);
              const totalFunding = td + wholesale;
              const wsShare = totalFunding > 0 ? wholesale / totalFunding : 0;
              return (
                <>
                  <ReportRow label="Indirect loan share" value={fpct(indShare, 1)} neg={indShare > 0.15} />
                  <ReportRow label="Wholesale funding share" value={fpct(wsShare, 1)} neg={wsShare > 0.15} />
                </>
              );
            })()}
          </ReportSection>
        </div>
      </div>

      <div style={{ marginTop: 18, padding: "10px 14px", background: RP.bgRaised, borderRadius: 8, fontSize: 11, color: RP.textMute, fontStyle: "italic", textAlign: "center" }}>
        Pursuant to 12 U.S.C. § 1817(a). Prepared by management; certified by Chief Financial Officer.
      </div>
    </div>
  );
}

Object.assign(window, { CallReportTab });
