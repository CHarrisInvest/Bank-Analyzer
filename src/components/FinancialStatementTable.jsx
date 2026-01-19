import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';

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
function exportToCSV(items, periods, getValue, title, annotations = {}) {
  const headers = ['Item', ...periods.map(p => p.label), 'Notes'];
  const rows = items.map(item => {
    const values = periods.map(p => {
      const val = getValue(item.tag, p.key, item.idx);
      const v = typeof val === 'object' ? val.value : val;
      return v !== null ? v : '';
    });
    // Gather any annotations for this item
    const notes = periods.map(p => {
      const key = `${item.tag}-${p.key}`;
      return annotations[key] || '';
    }).filter(n => n).join('; ');
    return [item.label, ...values, notes];
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
  formatValue,
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
    exportToCSV(items, periods, getValue, title, annotations);
  }, [items, periods, getValue, title, annotations]);

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
    const isPinned = pinnedPeriods.has(period.key);
    const annotationKey = `${item.tag}-${period.key}`;
    const hasAnnotation = !!annotations[annotationKey];

    const isPerShare = item.tag?.toLowerCase().includes('pershare') || item.tag?.includes('Earnings');
    const isShares = item.tag?.toLowerCase().includes('shares');
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
      ? { left: `calc(180px + ${pinnedIndex * 100}px)`, zIndex: 2 }
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

    let displayValue;
    if (isShares) {
      displayValue = value !== null ? value.toLocaleString() : '-';
    } else if (isPerShare) {
      displayValue = value !== null ? '$' + value.toFixed(2) : '-';
    } else {
      displayValue = formatValue(value);
    }

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
          <span className="item-label">{item.label}</span>
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
      <div className="financial-table-wrapper">
        <table className="financial-table multi-period transposed" ref={tableRef} onKeyDown={handleKeyDown}>
          <thead>
            <tr>
              <th className="label-col sticky-col">Period</th>
              {filteredItems.map((item, idx) => (
                <th key={`${item.tag}-${idx}`} className="value-col transposed-header">
                  <div className="transposed-item-label" title={item.label}>
                    {item.label.length > 20 ? item.label.substring(0, 18) + '...' : item.label}
                  </div>
                </th>
              ))}
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
                    const isPerShare = item.tag?.toLowerCase().includes('pershare') || item.tag?.includes('Earnings');
                    const isShares = item.tag?.toLowerCase().includes('shares');
                    const valueClass = getValueClass(value, item);

                    let displayValue;
                    if (isShares) {
                      displayValue = value !== null ? value.toLocaleString() : '-';
                    } else if (isPerShare) {
                      displayValue = value !== null ? '$' + value.toFixed(2) : '-';
                    } else {
                      displayValue = formatValue(value);
                    }

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
      <div className="financial-table-wrapper">
        <table className="financial-table multi-period" ref={tableRef} onKeyDown={handleKeyDown}>
          <thead>
            <tr>
              <th className="label-col sticky-col">Item</th>
              {displayPeriods.map((p, idx) => {
                const isPinned = pinnedPeriods.has(p.key);
                const pinnedIndex = [...pinnedPeriods].indexOf(p.key);
                const frozenStyle = isPinned && pinnedIndex >= 0
                  ? { left: `calc(180px + ${pinnedIndex * 100}px)`, zIndex: 3 }
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
                            label={section.header.label}
                          />
                        )}
                        <span className="item-label">{section.header.label}</span>
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
          <button className="export-btn" onClick={handleExport} title="Export to CSV">
            ⬇ Export
          </button>
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="keyboard-hint">
        <span>↑↓←→ Navigate</span>
        <span>Enter Pin</span>
        <span>N Note</span>
        <span>Double-click Edit note</span>
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
