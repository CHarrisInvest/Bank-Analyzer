/**
 * Bank Data Fetcher for GitHub Pages
 * Fetches bank financial data from static JSON file updated by GitHub Actions
 */

// Configuration
const DATA_CONFIG = {
  // Path to the static JSON file (updated daily by GitHub Actions)
  // Use relative path that works with GitHub Pages base URL
  dataFile: import.meta.env.BASE_URL + 'data/banks.json',
  // Path to individual bank data files (loaded on-demand)
  bankDataDir: import.meta.env.BASE_URL + 'data/banks/',
  // Cache-busting parameter
  cacheBuster: true,
};

/**
 * Validate that bank data is complete
 * @param {Object[]} banks - Array of bank records
 * @returns {Object} Validation result with isValid flag and reason
 */
function validateBankData(banks) {
  // Check if we have a reasonable amount of data
  if (banks.length === 0) {
    return {
      isValid: false,
      reason: 'No valid bank records found',
    };
  }

  // Check if at least some banks have core SEC data (totalAssets is always present)
  const banksWithData = banks.filter(bank =>
    bank.totalAssets !== null || bank.totalEquity !== null
  );

  if (banksWithData.length === 0) {
    return {
      isValid: false,
      reason: 'No banks have valid SEC data',
    };
  }

  return { isValid: true };
}

/**
 * Sleep for a specified duration
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch bank data from static JSON file with retry logic
 * @param {Object} options - Fetch options
 * @param {number} options.maxRetries - Maximum number of retry attempts
 * @returns {Promise<Object>} Bank data and metadata
 */
export async function fetchBankData(options = {}) {
  const {
    maxRetries = 3,
  } = options;

  let lastError = null;
  let attemptCount = 0;

  while (attemptCount <= maxRetries) {
    try {
      // Build URL with optional cache-busting
      let url = DATA_CONFIG.dataFile;
      if (DATA_CONFIG.cacheBuster) {
        url += `?t=${Date.now()}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const banks = await response.json();

      // Validate data completeness
      const validation = validateBankData(banks);

      if (!validation.isValid) {
        if (attemptCount < maxRetries) {
          console.warn(`Attempt ${attemptCount + 1}: ${validation.reason}. Retrying...`);
          lastError = new Error(validation.reason);
          attemptCount++;

          // Exponential backoff: 2s, 4s, 8s
          const retryDelay = 2000 * Math.pow(2, attemptCount - 1);
          await sleep(retryDelay);
          continue;
        } else {
          throw new Error(`${validation.reason} (after ${maxRetries} retries)`);
        }
      }

      // Data is valid, return success
      console.log(`Successfully fetched ${banks.length} bank records from data file on attempt ${attemptCount + 1}`);

      return {
        success: true,
        data: banks,
        metadata: {
          totalRecords: banks.length,
          fetchedAt: new Date().toISOString(),
          sourceUrl: DATA_CONFIG.dataFile,
          attemptCount: attemptCount + 1,
          source: 'static-json',
          lastUpdated: banks[0]?.updatedAt || null,
        },
      };
    } catch (error) {
      lastError = error;

      if (attemptCount < maxRetries) {
        console.warn(`Attempt ${attemptCount + 1} failed: ${error.message}. Retrying...`);
        attemptCount++;

        // Exponential backoff: 2s, 4s, 8s
        const retryDelay = 2000 * Math.pow(2, attemptCount - 1);
        await sleep(retryDelay);
      } else {
        break;
      }
    }
  }

  // All retries exhausted
  console.error('Error fetching bank data after all retries:', lastError);

  return {
    success: false,
    data: [],
    error: {
      message: lastError?.message || 'Unknown error occurred',
      type: lastError?.name || 'Error',
    },
    metadata: {
      fetchedAt: new Date().toISOString(),
      sourceUrl: DATA_CONFIG.dataFile,
      attemptCount: attemptCount + 1,
      source: 'static-json',
    },
  };
}

/**
 * Get unique exchange values from bank data
 * @param {Object[]} banks - Array of bank records
 * @returns {string[]} Unique exchange values
 */
export function getUniqueExchanges(banks) {
  const exchanges = new Set();

  banks.forEach((bank) => {
    if (bank.exchange) {
      exchanges.add(bank.exchange);
    }
  });

  return Array.from(exchanges).sort();
}

/**
 * Calculate statistics for a numeric field
 * @param {Object[]} banks - Array of bank records
 * @param {string} field - Field name to analyze
 * @returns {Object} Statistics object
 */
export function getFieldStats(banks, field) {
  const values = banks
    .map((b) => b[field])
    .filter((v) => v !== null && v !== undefined && !isNaN(v));

  if (values.length === 0) {
    return { min: null, max: null, avg: null, count: 0 };
  }

  const sorted = [...values].sort((a, b) => a - b);

  // Calculate median correctly for both odd and even length arrays
  let median;
  const midIndex = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    // Even length: average of two middle values
    median = (sorted[midIndex - 1] + sorted[midIndex]) / 2;
  } else {
    // Odd length: middle value
    median = sorted[midIndex];
  }

  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    avg: values.reduce((a, b) => a + b, 0) / values.length,
    median: median,
    count: values.length,
  };
}

/**
 * Fetch raw SEC data for a specific bank by CIK
 * Individual bank files are loaded on-demand to avoid large file size issues
 * @param {string} cik - The bank's CIK (Central Index Key)
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Raw SEC data for the specific bank
 */
export async function fetchBankRawData(cik, options = {}) {
  const { maxRetries = 2 } = options;

  if (!cik) {
    return {
      success: false,
      data: null,
      error: { message: 'No CIK provided', type: 'ValidationError' },
    };
  }

  // Ensure CIK is zero-padded to 10 digits
  const paddedCik = cik.toString().padStart(10, '0');

  let lastError = null;
  let attemptCount = 0;

  while (attemptCount <= maxRetries) {
    try {
      // Build URL with optional cache-busting
      let url = `${DATA_CONFIG.bankDataDir}${paddedCik}.json`;
      if (DATA_CONFIG.cacheBuster) {
        url += `?t=${Date.now()}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // Bank data file doesn't exist - this is expected for some banks
          return {
            success: false,
            data: null,
            error: { message: 'Bank data not available', type: 'NotFound' },
          };
        }
        throw new Error(`Failed to fetch bank data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
        metadata: {
          cik: paddedCik,
          fetchedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      lastError = error;

      if (attemptCount < maxRetries) {
        console.warn(`Attempt ${attemptCount + 1} failed for bank ${paddedCik}: ${error.message}. Retrying...`);
        attemptCount++;
        // Exponential backoff: 1s, 2s
        const retryDelay = 1000 * Math.pow(2, attemptCount - 1);
        await sleep(retryDelay);
      } else {
        break;
      }
    }
  }

  // Non-critical error - return failure but don't crash the app
  console.warn(`Could not fetch data for bank ${paddedCik}:`, lastError?.message);

  return {
    success: false,
    data: null,
    error: {
      message: lastError?.message || 'Unknown error',
      type: lastError?.name || 'Error',
    },
  };
}
