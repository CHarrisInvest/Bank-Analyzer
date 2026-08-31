import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { cleanLabel, resolveLabels, truncateLabel } from '../utils/labels';
import { detectSection, groupItemsIntoSections, selectStatementRows } from '../utils/statementLayout';
import { formatStatementCell, isPerShareTag, isShareCountTag } from '../utils/format.js';



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
 * Export data to CSV format
 */
function exportToCSV(items, periods, getValue, title, annotations = {}) {
  // Export what the table shows, not the filing's raw caption -- otherwise a
  // download reintroduces every comparative the table strips. The original is
  // kept in a trailing column so nothing is lost.
  //
  // Takes the table's own rows, so the download does not reintroduce the ones
  // it drops either: note references valued zero in every period, and the
  // share counts below the balance sheet's footing total.
  const shown = resolveLabels(items);
  const headers = ['Item', ...periods.map(p => p.label), 'Notes', 'Original SEC label'];
  const rows = items.map((item, i) => {
    const values = periods.map(p => {
      const val = getValue(item.tag, p.key, item.idx);
      const v = (val !== null && typeof val === 'object') ? val.value : val;
      return v !== null ? v : '';
    });
    // Gather any annotations for this item
    const notes = periods.map(p => {
      const key = `${item.tag}-${p.key}`;
      return annotations[key] || '';
    }).filter(n => n).join('; ');
    return [shown[i] ?? item.label, ...values, notes, item.label];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell =>
      typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))
        ? `"${cell.replace(/"/g, '""')}"`
        : cell
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
 * Annotation popup component
 */
function AnnotationPopup({ value, onChange, onClose, position }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className="annotation-popup"
      style={{ top: position.top, left: position.left }}
      onClick={(e) => e.stopPropagation()}
    >
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add note..."
        rows={3}
      />
      <div className="annotation-actions">
        <button onClick={onClose} className="annotation-save">Done</button>
        <button onClick={() => { onChange(''); onClose(); }} className="annotation-clear">Clear</button>
      </div>
    </div>
  );
}

/**
 * Tooltip component for showing period-over-period changes
 */
function ValueTooltip({ value, prevValue, prevLabel, position, isExpense }) {
  if (!position) return null;

  const change = calcChange(value, prevValue);
  const changeText = change !== null
    ? `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`
    : 'N/A';
  const isPositive = isExpense ? change < 0 : change > 0;

  return (
    <div
      className="value-tooltip"
      style={{ top: position.top, left: position.left }}
    >
      <div className="tooltip-row">
        <span className="tooltip-label">vs {prevLabel}:</span>
        <span className={`tooltip-change ${change !== null ? (isPositive ? 'positive' : 'negative') : ''}`}>
          {changeText}
        </span>
      </div>
      {prevValue !== null && (
        <div className="tooltip-prev">
          Prior: {typeof prevValue === 'number' ? prevValue.toLocaleString() : prevValue}
        </div>
      )}
    </div>
  );
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
  viewMode,
  onViewModeChange,
  expanded,
  onExpandToggle,
  hasMoreQuarters,
  defaultQuartersShown,
  showDerivedNote = false,
  isIncomeStatement = false,
  bankId = 'default', // Used for localStorage key
}) {
  // Feature states
  const [searchTerm, setSearchTerm] = useState('');
  const [pinnedPeriods, setPinnedPeriods] = useState(new Set());
  const [collapsedSections, setCollapsedSections] = useState(new Set());
  const [showComparison, setShowComparison] = useState(false);
  const [showSparklines, setShowSparklines] = useState(true);
  const [transposed, setTransposed] = useState(false);

  // Keyboard navigation state
  const [focusedCell, setFocusedCell] = useState({ row: 0, col: 0 });
  const tableRef = useRef(null);
  const labelColRef = useRef(null);
  const wrapperRef = useRef(null);
  const [labelColWidth, setLabelColWidth] = useState(280);
  const [freezeLabels, setFreezeLabels] = useState(false);

  // Annotation state (persisted to localStorage)
  const [annotations, setAnnotations] = useState(() => {
    try {
      const stored = localStorage.getItem(`fs-annotations-${bankId}-${title}`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [activeAnnotation, setActiveAnnotation] = useState(null);

  // Tooltip state
  const [tooltip, setTooltip] = useState(null);

  // Save annotations to localStorage
  useEffect(() => {
    try {
      if (Object.keys(annotations).length > 0) {
        localStorage.setItem(`fs-annotations-${bankId}-${title}`, JSON.stringify(annotations));
      } else {
        localStorage.removeItem(`fs-annotations-${bankId}-${title}`);
      }
    } catch (e) {
      console.warn('Could not save annotations to localStorage:', e);
    }
  }, [annotations, bankId, title]);

  // Filter items based on search and whether they have values in displayed periods
  // Rows that actually render, each with the label it will display.
  // Labels are resolved over this whole set rather than per row, because
  // disambiguating a collision needs to know which other rows are on screen.
  // Resolved before the search filter so typing does not change a label.
  const rowsWithValues = useMemo(() => {
    const withValues = selectStatementRows(items.map(item => ({
      ...item,
      values: periods.map(p => {
        const val = getValue(item.tag, p.key, item.idx);
        return (val !== null && typeof val === 'object') ? val.value : val;
      }),
    })));
    const labels = resolveLabels(withValues);
    return withValues.map((item, i) => ({ ...item, displayLabel: labels[i] }));
  }, [items, periods, getValue]);

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return rowsWithValues;
    const term = searchTerm.toLowerCase();
    // Match the visible text as well as the raw label, so searching for
    // something on screen works, and searching a stripped figure still does.
    return rowsWithValues.filter(item =>
      item.displayLabel.toLowerCase().includes(term) ||
      item.label.toLowerCase().includes(term) ||
      item.tag.toLowerCase().includes(term)
    );
  }, [rowsWithValues, searchTerm]);

  // Group items into sections for collapsible UI
  const sections = useMemo(() => {
    return groupItemsIntoSections(filteredItems.map((item, idx) => ({ ...item, idx })));
  }, [filteredItems]);

  // Flatten visible rows for keyboard navigation
  const visibleRows = useMemo(() => {
    const rows = [];
    sections.forEach(section => {
      const isCollapsed = collapsedSections.has(section.id);
      if (section.header) {
        rows.push({ type: 'header', item: section.header, idx: section.headerIdx, sectionId: section.id });
      }
      if (!isCollapsed) {
        section.children.forEach(({ item, idx }) => {
          rows.push({ type: 'row', item, idx, sectionId: section.id });
        });
      }
    });
    return rows;
  }, [sections, collapsedSections]);

  // Get all values for an item across periods (for sparkline)
  const getItemValues = useCallback((item) => {
    return allPeriods.map(p => {
      const val = getValue(item.tag, p.key, item.idx);
      return (val !== null && typeof val === 'object') ? val.value : val;
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

  // Measure label column width for accurate frozen column positioning
  useEffect(() => {
    if (labelColRef.current) {
      setLabelColWidth(labelColRef.current.offsetWidth);
    }
  }, [displayPeriods]);

  // Continuous rAF polling for frozen labels (works during iOS momentum scrolling)
  useEffect(() => {
    if (!freezeLabels || !wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    let running = true;
    let lastScrollLeft = -1;

    const tick = () => {
      if (!running) return;
      const scrollLeft = wrapper.scrollLeft;
      if (scrollLeft !== lastScrollLeft) {
        wrapper.style.setProperty('--scroll-x', `${scrollLeft}px`);
        lastScrollLeft = scrollLeft;
      }
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    return () => {
      running = false;
      wrapper.style.removeProperty('--scroll-x');
    };
  }, [freezeLabels]);

  // Handle export
  const handleExport = useCallback(() => {
    // rowsWithValues, not the raw items and not the search-filtered set: the
    // export follows what the statement contains, not what is typed in the
    // search box.
    exportToCSV(rowsWithValues, periods, getValue, title, annotations);
  }, [rowsWithValues, periods, getValue, title, annotations]);

  // Handle annotation update
  const updateAnnotation = useCallback((key, value) => {
    setAnnotations(prev => {
      if (!value || value.trim() === '') {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: value };
    });
  }, []);

  // Open annotation popup
  const openAnnotation = useCallback((key, position) => {
    setActiveAnnotation({ key, position, value: annotations[key] || '' });
  }, [annotations]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e) => {
    const { row, col } = focusedCell;
    const maxRow = transposed ? displayPeriods.length - 1 : visibleRows.length - 1;
    const maxCol = transposed ? visibleRows.length : displayPeriods.length;

    let newRow = row;
    let newCol = col;
    let handled = false;

    switch (e.key) {
      case 'ArrowUp':
        newRow = Math.max(0, row - 1);
        handled = true;
        break;
      case 'ArrowDown':
        newRow = Math.min(maxRow, row + 1);
        handled = true;
        break;
      case 'ArrowLeft':
        newCol = Math.max(0, col - 1);
        handled = true;
        break;
      case 'ArrowRight':
        newCol = Math.min(maxCol, col + 1);
        handled = true;
        break;
      case 'Enter':
        // Toggle pin for current column (if on a value column)
        if (col > 0) {
          const periodIdx = col - 1;
          if (displayPeriods[periodIdx]) {
            togglePin(displayPeriods[periodIdx].key);
          }
        }
        handled = true;
        break;
      case 'n':
      case 'N':
        // Open annotation for current cell
        if (col > 0 && !transposed) {
          const rowData = visibleRows[row];
          const period = displayPeriods[col - 1];
          if (rowData && period) {
            const key = `${rowData.item.tag}-${period.key}`;
            const cell = tableRef.current?.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
              const rect = cell.getBoundingClientRect();
              openAnnotation(key, { top: rect.bottom + 5, left: rect.left });
            }
          }
        }
        handled = true;
        break;
      case 'Home':
        newCol = 0;
        handled = true;
        break;
      case 'End':
        newCol = maxCol;
        handled = true;
        break;
      default:
        break;
    }

    if (handled) {
      e.preventDefault();
      setFocusedCell({ row: newRow, col: newCol });
    }
  }, [focusedCell, displayPeriods, visibleRows, transposed, togglePin, openAnnotation]);

  // Focus management
  useEffect(() => {
    const cell = tableRef.current?.querySelector(`[data-row="${focusedCell.row}"][data-col="${focusedCell.col}"]`);
    cell?.focus();
  }, [focusedCell]);

  // Show tooltip on cell hover
  const handleCellMouseEnter = useCallback((e, item, periodIdx, value) => {
    if (!item || periodIdx >= displayPeriods.length - 1) return; // No next period to compare

    const nextPeriod = displayPeriods[periodIdx + 1];
    if (!nextPeriod) return;

    const nextRawVal = getValue(item.tag, nextPeriod.key, item.idx);
    const nextValue = (nextRawVal !== null && typeof nextRawVal === 'object') ? nextRawVal.value : nextRawVal;

    const rect = e.currentTarget.getBoundingClientRect();
    const isExpense = item.label?.toLowerCase().includes('expense') || item.tag?.toLowerCase().includes('expense');

    setTooltip({
      value,
      prevValue: nextValue,
      prevLabel: nextPeriod.label,
      position: { top: rect.top - 60, left: rect.left + rect.width / 2 },
      isExpense,
    });
  }, [displayPeriods, getValue]);

  const handleCellMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  // Get conditional formatting class based on value
  const getValueClass = useCallback((value, item) => {
    if (value === null || value === undefined) return '';
    const classes = [];

    // Negative values in red
    if (typeof value === 'number' && value < 0) {
      classes.push('value-negative');
    }

    // Large positive values (optional highlight)
    // Could add more conditions here based on value magnitude

    return classes.join(' ');
  }, []);

  // Render a single data cell
  const renderCell = (item, period, periodIdx, rowIdx, isTotal = false) => {
    if (!item || !period) return null;

    const rawVal = getValue(item.tag, period.key, item.idx);
    // Note: typeof null === 'object' in JS, so check for null explicitly
    const value = (rawVal !== null && typeof rawVal === 'object') ? rawVal.value : rawVal;
    const derivedUnavailable = (rawVal !== null && typeof rawVal === 'object') ? rawVal.derivedUnavailable : false;
    // Data quality indicators
    const isDerived = (rawVal !== null && typeof rawVal === 'object') ? rawVal.isDerived : false;
    const isRestated = (rawVal !== null && typeof rawVal === 'object') ? rawVal.isRestated : false;
    const isAnnualProxy = (rawVal !== null && typeof rawVal === 'object') ? rawVal.isAnnualProxy : false;
    const isPinned = pinnedPeriods.has(period.key);
    const annotationKey = `${item.tag}-${period.key}`;
    const hasAnnotation = !!annotations[annotationKey];

    const isExpense = item.label?.toLowerCase().includes('expense') || item.tag?.toLowerCase().includes('expense');

    // Calculate comparison (YoY/QoQ change)
    let changeEl = null;
    if (showComparison && periodIdx < displayPeriods.length - 1) {
      const nextPeriod = displayPeriods[periodIdx + 1];
      if (nextPeriod) {
        const nextRawVal = getValue(item.tag, nextPeriod.key, item.idx);
        const nextValue = (nextRawVal !== null && typeof nextRawVal === 'object') ? nextRawVal.value : nextRawVal;
        const change = calcChange(value, nextValue);
        changeEl = formatChange(change, isExpense);
      }
    }

    const isFocused = focusedCell.row === rowIdx && focusedCell.col === periodIdx + 1;
    const valueClass = getValueClass(value, item);

    // Determine left position for frozen pinned columns
    const pinnedIndex = [...pinnedPeriods].indexOf(period.key);
    const frozenStyle = isPinned && pinnedIndex >= 0
      ? { left: `${labelColWidth + pinnedIndex * 100}px`, zIndex: 2 }
      : {};

    if (derivedUnavailable) {
      return (
        <td
          key={period.key}
          className={`value-col ${isPinned ? 'pinned-col frozen-col' : ''} ${isFocused ? 'focused' : ''}`}
          style={frozenStyle}
          title="Derived value not available - missing prior quarter data"
          tabIndex={-1}
          data-row={rowIdx}
          data-col={periodIdx + 1}
          onClick={() => setFocusedCell({ row: rowIdx, col: periodIdx + 1 })}
        >
          <span className="derived-unavailable">-</span>
          {changeEl && <div className="change-row">{changeEl}</div>}
        </td>
      );
    }

    const displayValue = formatStatementCell(value, item.tag);

    // Build tooltip text for data quality indicators
    const indicatorTitles = [];
    if (isDerived) indicatorTitles.push('Derived: Q4 calculated as Annual - Q1 - Q2 - Q3');
    if (isRestated) indicatorTitles.push('Restated: Value from 10-K (accounting adjustment applied)');
    if (isAnnualProxy) indicatorTitles.push('Annual Proxy: Q4 uses annual weighted average (shares cannot be derived)');
    const indicatorTitle = indicatorTitles.join('\n');

    return (
      <td
        key={period.key}
        className={`value-col ${isPinned ? 'pinned-col frozen-col' : ''} ${isFocused ? 'focused' : ''} ${valueClass} ${hasAnnotation ? 'has-annotation' : ''}`}
        style={frozenStyle}
        tabIndex={-1}
        data-row={rowIdx}
        data-col={periodIdx + 1}
        onClick={() => setFocusedCell({ row: rowIdx, col: periodIdx + 1 })}
        onMouseEnter={(e) => handleCellMouseEnter(e, item, periodIdx, value)}
        onMouseLeave={handleCellMouseLeave}
        onDoubleClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          openAnnotation(annotationKey, { top: rect.bottom + 5, left: rect.left });
        }}
      >
        <div className="cell-content">
          {displayValue}
          {/* Data quality indicators */}
          {(isDerived || isRestated || isAnnualProxy) && (
            <span className="data-quality-indicators" title={indicatorTitle}>
              {isDerived && <span className="indicator indicator-derived" title="Derived (Q4 = Annual - Q1 - Q2 - Q3)">D</span>}
              {isRestated && <span className="indicator indicator-restated" title="Restated value from 10-K">R</span>}
              {isAnnualProxy && <span className="indicator indicator-proxy" title="Uses annual weighted average as proxy">~</span>}
            </span>
          )}
          {hasAnnotation && <span className="annotation-indicator" title={annotations[annotationKey]}>📝</span>}
        </div>
        {changeEl && <div className="change-row">{changeEl}</div>}
      </td>
    );
  };

  // Render a single row
  const renderRow = (item, idx, rowIdx, isHeader = false) => {
    const isTotal = isHeader || item.label.toLowerCase().includes('total') ||
                   item.tag === 'Assets' || item.tag === 'Liabilities' ||
                   item.tag.includes('StockholdersEquity') ||
                   item.tag === 'LiabilitiesAndStockholdersEquity' ||
                   item.tag.includes('NetIncome');

    const itemValues = getItemValues(item);
    const isFocusedRow = focusedCell.row === rowIdx && focusedCell.col === 0;

    return (
      <tr
        key={`${item.tag}-${idx}`}
        className={`${isTotal ? 'total-row' : ''} ${item.indent > 0 ? `indent-${Math.min(item.indent, 3)}` : ''}`}
      >
        <td
          className={`label-col sticky-col ${isFocusedRow ? 'focused' : ''}`}
          tabIndex={-1}
          data-row={rowIdx}
          data-col={0}
          onClick={() => setFocusedCell({ row: rowIdx, col: 0 })}
        >
          {item.indent > 0 && <span className="indent-marker" style={{ paddingLeft: `${item.indent * 12}px` }} />}
          <span className="item-label" title={item.label}>{item.displayLabel ?? cleanLabel(item.label)}</span>
          {/* A row the filer reported once reads as a row full of gaps. Say
              which it is, so a reader does not take the blanks for zeros. */}
          {itemValues.filter(v => v !== null).length === 1 && displayPeriods.length >= 4 && (
            <span
              className="indicator indicator-single-period"
              title="Reported in only one of the periods shown"
            >1P</span>
          )}
          {showSparklines && itemValues.filter(v => v !== null).length >= 2 && (
            <Sparkline values={itemValues} />
          )}
        </td>
        {displayPeriods.map((p, pIdx) => renderCell(item, p, pIdx, rowIdx, isTotal))}
      </tr>
    );
  };

  // Render transposed view (periods as rows, items as columns)
  const renderTransposedTable = () => {
    return (
      <div className={`financial-table-wrapper${freezeLabels ? ' labels-frozen' : ''}`} ref={wrapperRef}>
        <table className="financial-table multi-period transposed" ref={tableRef} onKeyDown={handleKeyDown}>
          <thead>
            <tr>
              <th className="label-col sticky-col">Period</th>
              {filteredItems.map((item, idx) => {
                const cleaned = item.displayLabel ?? cleanLabel(item.label);
                return (
                  <th key={`${item.tag}-${idx}`} className="value-col transposed-header">
                    <div className="transposed-item-label" title={cleaned}>
                      {truncateLabel(cleaned)}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {displayPeriods.map((period, periodIdx) => {
              const isPinned = pinnedPeriods.has(period.key);
              return (
                <tr key={period.key} className={isPinned ? 'pinned-row' : ''}>
                  <td className="label-col sticky-col">
                    <div className="period-label-cell">
                      <span>{period.label}</span>
                      <PinButton
                        isPinned={isPinned}
                        onClick={() => togglePin(period.key)}
                      />
                    </div>
                  </td>
                  {filteredItems.map((item, itemIdx) => {
                    if (!item) return null;
                    const rawVal = getValue(item.tag, period.key, item.idx);
                    const value = (rawVal !== null && typeof rawVal === 'object') ? rawVal.value : rawVal;
                    const valueClass = getValueClass(value, item);
                    // Same helper as the upright view: this used to have its
                    // own test for what counts as a per-share figure, and it
                    // rendered twelve of them as currency in millions.
                    const displayValue = formatStatementCell(value, item.tag);

                    return (
                      <td
                        key={`${item.tag}-${itemIdx}`}
                        className={`value-col ${valueClass}`}
                        data-row={periodIdx}
                        data-col={itemIdx + 1}
                      >
                        {displayValue}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // Render normal table view
  const renderNormalTable = () => {
    let rowCounter = 0;

    return (
      <div className={`financial-table-wrapper${freezeLabels ? ' labels-frozen' : ''}`} ref={wrapperRef}>
        <table className="financial-table multi-period" ref={tableRef} onKeyDown={handleKeyDown}>
          <thead>
            <tr>
              <th className="label-col sticky-col" ref={labelColRef}>Item</th>
              {displayPeriods.map((p, idx) => {
                const isPinned = pinnedPeriods.has(p.key);
                const pinnedIndex = [...pinnedPeriods].indexOf(p.key);
                const frozenStyle = isPinned && pinnedIndex >= 0
                  ? { left: `${labelColWidth + pinnedIndex * 100}px`, zIndex: 3 }
                  : {};

                return (
                  <th
                    key={p.key}
                    className={`value-col ${isPinned ? 'pinned-col frozen-col' : ''}`}
                    style={frozenStyle}
                  >
                    <div className="col-header">
                      <span>{p.label}</span>
                      <PinButton
                        isPinned={isPinned}
                        onClick={() => togglePin(p.key)}
                      />
                    </div>
                    {showComparison && <div className="change-header">% Chg</div>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sections.map(section => {
              const isCollapsed = collapsedSections.has(section.id);
              const hasChildren = section.children.length > 0;
              const headerRowIdx = rowCounter++;

              return (
                <React.Fragment key={section.id}>
                  {/* Section header row */}
                  {section.header && (
                    <tr className="section-header-row total-row">
                      <td
                        className={`label-col sticky-col ${focusedCell.row === headerRowIdx && focusedCell.col === 0 ? 'focused' : ''}`}
                        tabIndex={-1}
                        data-row={headerRowIdx}
                        data-col={0}
                        onClick={() => setFocusedCell({ row: headerRowIdx, col: 0 })}
                      >
                        {hasChildren && (
                          <SectionToggle
                            isCollapsed={isCollapsed}
                            onClick={() => toggleSection(section.id)}
                            label={section.header.displayLabel ?? cleanLabel(section.header.label)}
                          />
                        )}
                        <span className="item-label" title={section.header.label}>{section.header.displayLabel ?? cleanLabel(section.header.label)}</span>
                        {showSparklines && (
                          <Sparkline values={getItemValues(section.header)} />
                        )}
                      </td>
                      {displayPeriods.map((p, pIdx) => renderCell(section.header, p, pIdx, headerRowIdx, true))}
                    </tr>
                  )}
                  {/* Section children */}
                  {!isCollapsed && section.children.map(({ item, idx }) => {
                    const childRowIdx = rowCounter++;
                    return renderRow(item, idx, childRowIdx, false);
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
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
          {/* Fewer than four quarters cannot support a trailing-twelve-month
              reading, and the ratios elsewhere on the page lean on one. Say so
              rather than letting a short history look like a full one. */}
          {viewMode === 'quarterly' && allPeriods.length > 0 && allPeriods.length < 4 && (
            <p className="statement-warning" role="status">
              {allPeriods.length === 1
                ? 'Only one quarter has'
                : `Only ${allPeriods.length} quarters have`} been filed since this bank began
              reporting — not enough for a twelve-month view, so TTM figures and the ratios
              derived from them are incomplete.
            </p>
          )}
        </div>
        <div className="statement-header-right">
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
          <button className="export-btn header-export" onClick={handleExport} title="Export to CSV">
            ⬇ Export
          </button>
          {hasMoreQuarters && (
            <button className="expand-btn" onClick={onExpandToggle}>
              {expanded ? 'Show less' : `Show all ${allPeriods.length}`}
            </button>
          )}
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
          <label className="toolbar-toggle">
            <input
              type="checkbox"
              checked={transposed}
              onChange={(e) => setTransposed(e.target.checked)}
            />
            <span>Transpose</span>
          </label>
          <label className="toolbar-toggle freeze-toggle">
            <input
              type="checkbox"
              checked={freezeLabels}
              onChange={(e) => setFreezeLabels(e.target.checked)}
            />
            <span>Lock Labels</span>
          </label>
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="keyboard-hint">
        <span>↑↓←→ Navigate</span>
        <span>Enter Pin</span>
        <span>N Note</span>
        <span>Double-click Edit note</span>
        {isIncomeStatement && viewMode === 'quarterly' && (
          <>
            <span className="hint-separator">|</span>
            <span className="indicator-legend">
              <span className="indicator indicator-derived">D</span> Derived
            </span>
            <span className="indicator-legend">
              <span className="indicator indicator-restated">R</span> Restated
            </span>
            <span className="indicator-legend">
              <span className="indicator indicator-proxy">~</span> Annual Proxy
            </span>
            <span className="indicator-legend">
              <span className="indicator indicator-single-period">1P</span> One period only
            </span>
          </>
        )}
      </div>

      {/* Table */}
      {transposed ? renderTransposedTable() : renderNormalTable()}

      {/* Pinned columns indicator */}
      {pinnedPeriods.size > 0 && (
        <div className="pinned-indicator">
          📌 {pinnedPeriods.size} column{pinnedPeriods.size > 1 ? 's' : ''} pinned (frozen)
          <button className="clear-pins" onClick={() => setPinnedPeriods(new Set())}>
            Clear all
          </button>
        </div>
      )}

      {/* Tooltip for period-over-period change */}
      {tooltip && (
        <ValueTooltip
          value={tooltip.value}
          prevValue={tooltip.prevValue}
          prevLabel={tooltip.prevLabel}
          position={tooltip.position}
          isExpense={tooltip.isExpense}
        />
      )}

      {/* Annotation popup */}
      {activeAnnotation && (
        <>
          <div className="annotation-overlay" onClick={() => setActiveAnnotation(null)} />
          <AnnotationPopup
            value={activeAnnotation.value}
            onChange={(val) => setActiveAnnotation(prev => ({ ...prev, value: val }))}
            onClose={() => {
              updateAnnotation(activeAnnotation.key, activeAnnotation.value);
              setActiveAnnotation(null);
            }}
            position={activeAnnotation.position}
          />
        </>
      )}
    </div>
  );
}
