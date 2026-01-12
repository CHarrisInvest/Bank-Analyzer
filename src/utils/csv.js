/**
 * Robust CSV Parser
 * Handles quoted fields, commas within quotes, escaped quotes, and newlines
 */

/**
 * Parse a CSV string into an array of objects
 * @param {string} csvText - Raw CSV text
 * @param {Object} options - Parser options
 * @param {number} options.headerRowIndex - Index of the header row (0-based)
 * @param {boolean} options.skipEmptyRows - Skip empty rows
 * @returns {Object} Parsed data with headers and rows
 */
export function parseCSV(csvText, options = {}) {
  const { headerRowIndex = 0, skipEmptyRows = true } = options;

  if (!csvText || typeof csvText !== 'string') {
    throw new Error('Invalid CSV input: expected a non-empty string');
  }

  const rows = parseCSVRows(csvText);

  if (rows.length === 0) {
    return { headers: [], data: [] };
  }

  // Validate header row index
  if (headerRowIndex < 0 || headerRowIndex >= rows.length) {
    throw new Error(`Invalid header row index: ${headerRowIndex}. CSV has ${rows.length} rows.`);
  }

  const headers = rows[headerRowIndex].map((header) => header.trim());
  const dataRows = rows.slice(headerRowIndex + 1);

  const data = dataRows
    .filter((row) => {
      if (skipEmptyRows) {
        return row.some((cell) => cell.trim() !== '');
      }
      return true;
    })
    .map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] !== undefined ? row[index].trim() : '';
      });
      return obj;
    });

  return { headers, data };
}

/**
 * Parse CSV text into array of arrays (rows of cells)
 * Handles RFC 4180 compliant CSV with quoted fields
 * @param {string} csvText - Raw CSV text
 * @returns {string[][]} Array of rows, each row is array of cell values
 */
function parseCSVRows(csvText) {
  const rows = [];
  let currentRow = [];
  let currentCell = '';
  let insideQuotes = false;
  let i = 0;

  // Normalize line endings
  const text = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  while (i < text.length) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (insideQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote - add single quote and skip next char
          currentCell += '"';
          i += 2;
          continue;
        } else {
          // End of quoted field
          insideQuotes = false;
          i++;
          continue;
        }
      } else {
        // Regular character inside quotes (including newlines and commas)
        currentCell += char;
        i++;
        continue;
      }
    } else {
      // Not inside quotes
      if (char === '"') {
        // Start of quoted field
        insideQuotes = true;
        i++;
        continue;
      } else if (char === ',') {
        // End of cell
        currentRow.push(currentCell);
        currentCell = '';
        i++;
        continue;
      } else if (char === '\n') {
        // End of row
        currentRow.push(currentCell);
        rows.push(currentRow);
        currentRow = [];
        currentCell = '';
        i++;
        continue;
      } else {
        // Regular character
        currentCell += char;
        i++;
        continue;
      }
    }
  }

  // Handle last cell and row
  if (currentCell !== '' || currentRow.length > 0) {
    currentRow.push(currentCell);
    rows.push(currentRow);
  }

  return rows;
}

/**
 * Parse a numeric value from a string, handling various formats
 * @param {string} value - String value to parse
 * @returns {number|null} Parsed number or null if invalid
 */
export function parseNumericValue(value) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  // Remove currency symbols, commas, and whitespace
  const cleaned = String(value)
    .replace(/[$,\s]/g, '')
    .replace(/[()]/g, (match) => (match === '(' ? '-' : ''))
    .trim();

  if (cleaned === '' || cleaned === '-') {
    return null;
  }

  // Handle percentage values
  const isPercent = cleaned.endsWith('%');
  const numStr = isPercent ? cleaned.slice(0, -1) : cleaned;

  const num = parseFloat(numStr);

  if (isNaN(num)) {
    return null;
  }

  // Convert percentage to decimal if needed (for display we keep as percentage)
  return num;
}

/**
 * Format a number for display
 * @param {number} value - Number to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted string
 */
export function formatNumber(value, options = {}) {
  const {
    decimals = 2,
    prefix = '',
    suffix = '',
    abbreviate = false,
  } = options;

  if (value === null || value === undefined || isNaN(value)) {
    return '-';
  }

  let formattedValue;

  if (abbreviate && Math.abs(value) >= 1e9) {
    formattedValue = (value / 1e9).toFixed(decimals) + 'B';
  } else if (abbreviate && Math.abs(value) >= 1e6) {
    formattedValue = (value / 1e6).toFixed(decimals) + 'M';
  } else if (abbreviate && Math.abs(value) >= 1e3) {
    formattedValue = (value / 1e3).toFixed(decimals) + 'K';
  } else {
    formattedValue = value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  return `${prefix}${formattedValue}${suffix}`;
}
