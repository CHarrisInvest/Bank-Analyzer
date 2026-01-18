import React, { useState, useMemo, useCallback } from 'react';

/**
 * Sparkline Component - Mini inline SVG chart showing trend
 */
function Sparkline({ values, width = 50, height = 16 }) {
  const validValues = values.filter(v => v !== null && v !== undefined && !isNaN(v));
  if (validValues.length < 2) return null;

  const min = Math.min(...validValues);
  const max = Math.max(...validValues);
  const range = max - min || 1;

  // Values are in reverse chronological order, so reverse for display (oldest to newest)
  const displayValues = [...validValues].reverse();

  const points = displayValues.map((v, i) => {
    const x = (i / (displayValues.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  // Determine trend color
  const firstVal = displayValues[0];
  const lastVal = displayValues[displayValues.length - 1];
  const isPositive = lastVal >= firstVal;
  const color = isPositive ? 'var(--color-success, #10b981)' : 'var(--color-danger, #ef4444)';

  return (
    <svg width={width} height={height} className="sparkline" aria-hidden="true">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

/**
 * Section collapse/expand toggle button
 */
function SectionToggle({ isCollapsed, onClick, label }) {
  return (
    <button
      className="section-toggle"
      onClick={onClick}
      aria-expanded={!isCollapsed}
      title={isCollapsed ? `Expand ${label}` : `Collapse ${label}`}
    >
      <span className={`toggle-icon ${isCollapsed ? 'collapsed' : ''}`}>
        {isCollapsed ? '+' : '−'}
      </span>
    </button>
  );
}

/**
 * Pin button for column pinning
 */
function PinButton({ isPinned, onClick }) {
  return (
    <button
      className={`pin-btn ${isPinned ? 'pinned' : ''}`}
      onClick={onClick}
      title={isPinned ? 'Unpin column' : 'Pin column for comparison'}
    >
      📌
    </button>
  );
}

/**
 * Calculate percentage change between two values
 */
function calcChange(current, previous) {
  if (current === null || previous === null || previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}

/**
 * Format percentage change with color coding
 */
function formatChange(change, invertColor = false) {
  if (change === null) return <span className="change-na">-</span>;
  const isPositive = change >= 0;
  const displayPositive = invertColor ? !isPositive : isPositive;
  const colorClass = displayPositive ? 'change-positive' : 'change-negative';
  const sign = change >= 0 ? '+' : '';
  return <span className={`change-value ${colorClass}`}>{sign}{change.toFixed(1)}%</span>;
}

/**
 * Detect if an item is a section header based on common patterns
 */
function detectSection(item, prevItem) {
  const label = item.label.toLowerCase();
  const tag = item.tag.toLowerCase();

  // Common section headers
  const sectionPatterns = [
    'assets', 'liabilities', 'equity', 'stockholders',
    'revenue', 'income', 'expense', 'interest', 'operating',
    'current assets', 'current liabilities', 'non-current',
    'total assets', 'total liabilities'
  ];

  // Check if this looks like a section header (bold/total item with children)
  const isSection = sectionPatterns.some(p => label.includes(p) || tag.includes(p));
  const hasNoIndent = !item.indent || item.indent === 0;

  return isSection && hasNoIndent;
}

/**
 * Group items into collapsible sections
 */
function groupItemsIntoSections(items) {
  const sections = [];
  let currentSection = null;

  items.forEach((item, idx) => {
    const isSection = detectSection(item, items[idx - 1]);

    if (isSection && (!item.indent || item.indent === 0)) {
      // Start a new section
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        header: item,
        headerIdx: idx,
        children: [],
        id: `section-${idx}`,
      };
    } else if (currentSection) {
      currentSection.children.push({ item, idx });
    } else {
      // Items before first section header
      sections.push({
        header: null,
        headerIdx: -1,
        children: [{ item, idx }],
        id: `section-pre-${idx}`,
      });
    }
  });

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Export data to CSV format
 */
function exportToCSV(items, periods, getValue, title) {
  const headers = ['Item', ...periods.map(p => p.label)];
  const rows = items.map(item => {
    const values = periods.map(p => {
      const val = getValue(item.tag, p.key, item.idx);
      const v = typeof val === 'object' ? val.value : val;
      return v !== null ? v : '';
    });
    return [item.label, ...values];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell =>
      typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell
    ).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

/**
 * Main Financial Statement Table Component
 */
export default function FinancialStatementTable({
  title,
  items,
  periods,
  allPeriods,
  getValue,
  formatValue,
  viewMode,
  onViewModeChange,
  expanded,
  onExpandToggle,
  hasMoreQuarters,
  defaultQuartersShown,
  showDerivedNote = false,
  isIncomeStatement = false,
}) {
  // Feature states
  const [searchTerm, setSearchTerm] = useState('');
  const [pinnedPeriods, setPinnedPeriods] = useState(new Set());
  const [collapsedSections, setCollapsedSections] = useState(new Set());
  const [showComparison, setShowComparison] = useState(false);
  const [showSparklines, setShowSparklines] = useState(true);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(item =>
      item.label.toLowerCase().includes(term) ||
      item.tag.toLowerCase().includes(term)
    );
  }, [items, searchTerm]);

  // Group items into sections for collapsible UI
  const sections = useMemo(() => {
    return groupItemsIntoSections(filteredItems.map((item, idx) => ({ ...item, idx })));
  }, [filteredItems]);

  // Get all values for an item across periods (for sparkline)
  const getItemValues = useCallback((item) => {
    return allPeriods.map(p => {
      const val = getValue(item.tag, p.key, item.idx);
      return typeof val === 'object' ? val.value : val;
    });
  }, [allPeriods, getValue]);

  // Toggle section collapse
  const toggleSection = useCallback((sectionId) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }, []);

  // Toggle period pinning
  const togglePin = useCallback((periodKey) => {
    setPinnedPeriods(prev => {
      const next = new Set(prev);
      if (next.has(periodKey)) {
        next.delete(periodKey);
      } else {
        next.add(periodKey);
      }
      return next;
    });
  }, []);

  // Get display periods (pinned first, then regular)
  const displayPeriods = useMemo(() => {
    const pinned = periods.filter(p => pinnedPeriods.has(p.key));
    const unpinned = periods.filter(p => !pinnedPeriods.has(p.key));
    return [...pinned, ...unpinned];
  }, [periods, pinnedPeriods]);

  // Handle export
  const handleExport = useCallback(() => {
    exportToCSV(items, periods, getValue, title);
  }, [items, periods, getValue, title]);

  // Render a single row
  const renderRow = (item, idx, isVisible = true) => {
    const isTotal = item.label.toLowerCase().includes('total') ||
                   item.tag === 'Assets' || item.tag === 'Liabilities' ||
                   item.tag.includes('StockholdersEquity') ||
                   item.tag === 'LiabilitiesAndStockholdersEquity' ||
                   item.tag.includes('NetIncome');
    const isPerShare = item.tag.toLowerCase().includes('pershare') || item.tag.includes('Earnings');
    const isShares = item.tag.toLowerCase().includes('shares');
    const isExpense = item.label.toLowerCase().includes('expense') || item.tag.toLowerCase().includes('expense');

    const itemValues = getItemValues(item);

    if (!isVisible) return null;

    return (
      <tr
        key={`${item.tag}-${idx}`}
        className={`${isTotal ? 'total-row' : ''} ${item.indent > 0 ? `indent-${Math.min(item.indent, 3)}` : ''}`}
      >
        <td className="label-col sticky-col">
          {item.indent > 0 && <span className="indent-marker" style={{ paddingLeft: `${item.indent * 12}px` }} />}
          <span className="item-label">{item.label}</span>
          {showSparklines && itemValues.filter(v => v !== null).length >= 2 && (
            <Sparkline values={itemValues} />
          )}
        </td>
        {displayPeriods.map((p, pIdx) => {
          const rawVal = getValue(item.tag, p.key, idx);
          const value = typeof rawVal === 'object' ? rawVal.value : rawVal;
          const derivedUnavailable = typeof rawVal === 'object' ? rawVal.derivedUnavailable : false;
          const isPinned = pinnedPeriods.has(p.key);

          // Calculate comparison (YoY/QoQ change)
          let changeEl = null;
          if (showComparison && pIdx < displayPeriods.length - 1) {
            const nextPeriod = displayPeriods[pIdx + 1];
            const nextRawVal = getValue(item.tag, nextPeriod.key, idx);
            const nextValue = typeof nextRawVal === 'object' ? nextRawVal.value : nextRawVal;
            const change = calcChange(value, nextValue);
            changeEl = formatChange(change, isExpense);
          }

          if (derivedUnavailable) {
            return (
              <td
                key={p.key}
                className={`value-col ${isPinned ? 'pinned-col' : ''}`}
                title="Derived value not available - missing prior quarter data"
              >
                <span className="derived-unavailable">-</span>
                {changeEl && <div className="change-row">{changeEl}</div>}
              </td>
            );
          }

          let displayValue;
          if (isShares) {
            displayValue = value !== null ? value.toLocaleString() : '-';
          } else if (isPerShare) {
            displayValue = value !== null ? '$' + value.toFixed(2) : '-';
          } else {
            displayValue = formatValue(value);
          }

          return (
            <td key={p.key} className={`value-col ${isPinned ? 'pinned-col' : ''}`}>
              {displayValue}
              {changeEl && <div className="change-row">{changeEl}</div>}
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <div className="financial-statement-table">
      {/* Header with controls */}
      <div className="statement-header">
        <div className="statement-header-left">
          <h3>{title}</h3>
          <p className="statement-note">
            {viewMode === 'quarterly'
              ? `${periods.length} of ${allPeriods.length} quarters`
              : `${periods.length} years`}
            {' • '}{filteredItems.length}{searchTerm ? ` of ${items.length}` : ''} line items
            {showDerivedNote && viewMode === 'quarterly' && ' • Q4 derived'}
          </p>
        </div>
        <div className="statement-header-right">
          {hasMoreQuarters && (
            <button className="expand-btn" onClick={onExpandToggle}>
              {expanded ? 'Show less' : `+${allPeriods.length - defaultQuartersShown} more`}
            </button>
          )}
          <div className="period-toggle">
            <button
              className={viewMode === 'quarterly' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => onViewModeChange('quarterly')}
            >
              Quarterly
            </button>
            <button
              className={viewMode === 'annual' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => onViewModeChange('annual')}
            >
              Annual
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar with search, filters, and export */}
      <div className="statement-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search line items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="search-clear" onClick={() => setSearchTerm('')}>×</button>
            )}
          </div>
        </div>
        <div className="toolbar-right">
          <label className="toolbar-toggle">
            <input
              type="checkbox"
              checked={showSparklines}
              onChange={(e) => setShowSparklines(e.target.checked)}
            />
            <span>Trends</span>
          </label>
          <label className="toolbar-toggle">
            <input
              type="checkbox"
              checked={showComparison}
              onChange={(e) => setShowComparison(e.target.checked)}
            />
            <span>% Change</span>
          </label>
          <button className="export-btn" onClick={handleExport} title="Export to CSV">
            ⬇ Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="financial-table-wrapper">
        <table className="financial-table multi-period">
          <thead>
            <tr>
              <th className="label-col sticky-col">Item</th>
              {displayPeriods.map(p => (
                <th key={p.key} className={`value-col ${pinnedPeriods.has(p.key) ? 'pinned-col' : ''}`}>
                  <div className="col-header">
                    <span>{p.label}</span>
                    <PinButton
                      isPinned={pinnedPeriods.has(p.key)}
                      onClick={() => togglePin(p.key)}
                    />
                  </div>
                  {showComparison && <div className="change-header">% Chg</div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sections.map(section => {
              const isCollapsed = collapsedSections.has(section.id);
              const hasChildren = section.children.length > 0;

              return (
                <React.Fragment key={section.id}>
                  {/* Section header row */}
                  {section.header && (
                    <tr className="section-header-row total-row">
                      <td className="label-col sticky-col">
                        {hasChildren && (
                          <SectionToggle
                            isCollapsed={isCollapsed}
                            onClick={() => toggleSection(section.id)}
                            label={section.header.label}
                          />
                        )}
                        <span className="item-label">{section.header.label}</span>
                        {showSparklines && (
                          <Sparkline values={getItemValues(section.header)} />
                        )}
                      </td>
                      {displayPeriods.map((p, pIdx) => {
                        const rawVal = getValue(section.header.tag, p.key, section.headerIdx);
                        const value = typeof rawVal === 'object' ? rawVal.value : rawVal;
                        const isPinned = pinnedPeriods.has(p.key);

                        let changeEl = null;
                        if (showComparison && pIdx < displayPeriods.length - 1) {
                          const nextPeriod = displayPeriods[pIdx + 1];
                          const nextRawVal = getValue(section.header.tag, nextPeriod.key, section.headerIdx);
                          const nextValue = typeof nextRawVal === 'object' ? nextRawVal.value : nextRawVal;
                          changeEl = formatChange(calcChange(value, nextValue));
                        }

                        return (
                          <td key={p.key} className={`value-col ${isPinned ? 'pinned-col' : ''}`}>
                            {formatValue(value)}
                            {changeEl && <div className="change-row">{changeEl}</div>}
                          </td>
                        );
                      })}
                    </tr>
                  )}
                  {/* Section children */}
                  {!isCollapsed && section.children.map(({ item, idx }) =>
                    renderRow(item, idx, true)
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pinned columns indicator */}
      {pinnedPeriods.size > 0 && (
        <div className="pinned-indicator">
          📌 {pinnedPeriods.size} column{pinnedPeriods.size > 1 ? 's' : ''} pinned
          <button className="clear-pins" onClick={() => setPinnedPeriods(new Set())}>
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
