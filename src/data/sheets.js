/**
 * Bank Data API Client
 * Fetches bank financial data from backend API with SEC EDGAR integration
 */

// Configuration for the backend API
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 30000, // 30 seconds
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

  // Check if at least some banks have numeric data
  const banksWithData = banks.filter(bank =>
    bank.price !== null || bank.marketCap !== null || bank.roe !== null
  );

  if (banksWithData.length === 0) {
    return {
      isValid: false,
      reason: 'No banks have valid numeric data',
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
 * Fetch bank data from backend API with retry logic
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
      const url = `${API_CONFIG.baseUrl}/api/banks`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'API returned unsuccessful response');
      }

      const banks = result.data || [];

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
      console.log(`Successfully fetched ${banks.length} bank records from API on attempt ${attemptCount + 1}`);

      return {
        success: true,
        data: banks,
        metadata: {
          totalRecords: banks.length,
          fetchedAt: result.timestamp || new Date().toISOString(),
          sourceUrl: url,
          attemptCount: attemptCount + 1,
          source: 'backend-api',
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
      sourceUrl: `${API_CONFIG.baseUrl}/api/banks`,
      attemptCount: attemptCount + 1,
      source: 'backend-api',
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
