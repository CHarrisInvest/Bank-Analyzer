/**
 * Custom Event Tracking Module
 * Defines all trackable events for the BankSift application
 * All events are designed with privacy in mind
 */

import { sendEvent } from './gtag.js';
import { isAnalyticsAllowed } from './consent.js';

/**
 * Check if event tracking is allowed
 */
function canTrack() {
  return isAnalyticsAllowed();
}

// =============================================================================
// SCREENER EVENTS
// =============================================================================

/**
 * Track when a filter is applied
 * @param {string} filterName - Name of the filter (e.g., 'roe', 'totalAssets')
 * @param {string} filterType - Type of filter action ('min', 'max', 'range', 'select')
 */
export function trackFilterApplied(filterName, filterType) {
  if (!canTrack()) return;
  
  sendEvent('filter_applied', {
    filter_name: filterName,
    filter_type: filterType,
    event_category: 'screener',
  });
}

/**
 * Track when sort column changes
 * @param {string} columnName - Name of the column sorted
 * @param {string} direction - Sort direction ('asc' or 'desc')
 */
export function trackSortChanged(columnName, direction) {
  if (!canTrack()) return;
  
  sendEvent('sort_changed', {
    column_name: columnName,
    sort_direction: direction,
    event_category: 'screener',
  });
}

/**
 * Track when exchange filter is applied
 * @param {string[]} exchanges - Array of selected exchanges
 */
export function trackExchangeFiltered(exchanges) {
  if (!canTrack()) return;
  
  sendEvent('exchange_filtered', {
    exchanges: exchanges.join(','),
    exchange_count: exchanges.length,
    event_category: 'screener',
  });
}

/**
 * Track search performed (anonymized - only query length and results)
 * @param {number} queryLength - Length of search query
 * @param {number} resultsCount - Number of results returned
 */
export function trackSearchPerformed(queryLength, resultsCount) {
  if (!canTrack()) return;
  
  sendEvent('search_performed', {
    query_length: queryLength,
    results_count: resultsCount,
    event_category: 'screener',
  });
}

/**
 * Track filters reset
 */
export function trackFiltersReset() {
  if (!canTrack()) return;
  
  sendEvent('filters_reset', {
    event_category: 'screener',
  });
}

// =============================================================================
// BANK DETAIL EVENTS
// =============================================================================

/**
 * Track when a bank detail page is viewed
 * @param {string} ticker - Bank ticker symbol
 * @param {string} tab - Active tab (overview, ratios, balanceSheet, incomeStatement)
 */
export function trackBankViewed(ticker, tab = 'overview') {
  if (!canTrack()) return;
  
  sendEvent('bank_viewed', {
    bank_ticker: ticker,
    active_tab: tab,
    event_category: 'bank_detail',
  });
}

/**
 * Track bank detail tab change
 * @param {string} ticker - Bank ticker symbol
 * @param {string} tab - New active tab
 */
export function trackBankTabChanged(ticker, tab) {
  if (!canTrack()) return;
  
  sendEvent('bank_tab_changed', {
    bank_ticker: ticker,
    tab_name: tab,
    event_category: 'bank_detail',
  });
}

// =============================================================================
// EDUCATIONAL CONTENT EVENTS
// =============================================================================

/**
 * Track when a metric explanation page is viewed
 * @param {string} metricSlug - Metric identifier
 */
export function trackMetricViewed(metricSlug) {
  if (!canTrack()) return;
  
  sendEvent('metric_viewed', {
    metric_slug: metricSlug,
    event_category: 'education',
  });
}

/**
 * Track when a valuation methodology page is viewed
 * @param {string} methodSlug - Valuation method identifier
 */
export function trackValuationMethodViewed(methodSlug) {
  if (!canTrack()) return;
  
  sendEvent('valuation_method_viewed', {
    method_slug: methodSlug,
    event_category: 'education',
  });
}

// =============================================================================
// ENGAGEMENT EVENTS
// =============================================================================

/**
 * Track scroll depth milestones
 * @param {number} percentage - Scroll depth percentage (25, 50, 75, 100)
 * @param {string} pagePath - Current page path
 */
export function trackScrollDepth(percentage, pagePath) {
  if (!canTrack()) return;
  
  sendEvent('scroll_depth', {
    depth_percentage: percentage,
    page_path: pagePath,
    event_category: 'engagement',
  });
}

/**
 * Track outbound link clicks
 * @param {string} destinationDomain - Domain of the clicked link
 * @param {string} linkText - Text of the link (truncated for privacy)
 */
export function trackOutboundClick(destinationDomain, linkText = '') {
  if (!canTrack()) return;
  
  sendEvent('outbound_click', {
    destination_domain: destinationDomain,
    link_text: linkText.substring(0, 50), // Truncate for privacy
    event_category: 'engagement',
  });
}

/**
 * Track session duration milestone (called periodically)
 * @param {number} seconds - Session duration in seconds
 */
export function trackSessionMilestone(seconds) {
  if (!canTrack()) return;
  
  sendEvent('session_milestone', {
    duration_seconds: seconds,
    event_category: 'engagement',
  });
}

// =============================================================================
// NAVIGATION EVENTS
// =============================================================================

/**
 * Track navigation menu interaction
 * @param {string} menuItem - Menu item clicked
 */
export function trackNavigation(menuItem) {
  if (!canTrack()) return;
  
  sendEvent('navigation_click', {
    menu_item: menuItem,
    event_category: 'navigation',
  });
}

// =============================================================================
// ERROR EVENTS
// =============================================================================

/**
 * Track data loading errors
 * @param {string} errorType - Type of error
 * @param {string} errorMessage - Error message (sanitized)
 */
export function trackDataError(errorType, errorMessage = '') {
  if (!canTrack()) return;
  
  sendEvent('data_error', {
    error_type: errorType,
    error_message: errorMessage.substring(0, 100), // Truncate
    event_category: 'error',
  });
}
