/**
 * Minimal inline markup for long-form page copy: **bold** and [label](/path).
 * Kept free of React so scripts/prerender.mjs can share it with the page
 * components and both render the same text.
 */

const INLINE = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Split a string into text, bold and link tokens
 * @param {string} text
 * @returns {Array<{type: 'text'|'bold'|'link', text: string, href?: string}>}
 */
export function parseInline(text) {
  const tokens = [];
  if (!text) return tokens;
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    if (match.index > last) tokens.push({ type: 'text', text: text.slice(last, match.index) });
    if (match[1] !== undefined) tokens.push({ type: 'bold', text: match[1] });
    else tokens.push({ type: 'link', text: match[2], href: match[3] });
    last = match.index + match[0].length;
  }
  if (last < text.length) tokens.push({ type: 'text', text: text.slice(last) });
  return tokens;
}

/**
 * The same string with the markup removed (for meta tags and structured data)
 * @param {string} text
 * @returns {string}
 */
export function stripInline(text) {
  return parseInline(text).map((token) => token.text).join('');
}
