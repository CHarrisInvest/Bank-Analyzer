import React from 'react';

/**
 * Regex to detect inline formulas in prose text.
 * Matches patterns like "X = Y / Z", "ROE × (1 - payout)", "P/B = P/E × ROE", etc.
 * Looks for sequences of word-like terms connected by mathematical operators
 * (=, +, -, ×, ÷, /, *) with optional parentheses and numbers.
 */
const FORMULA_PATTERN = /(?:[A-Za-z][A-Za-z0-9/]*(?:\s*[\(\)]\s*)?[\s]*[=+\-×÷*/][\s]*)+[A-Za-z0-9/\.\(\)\s]+/g;

/**
 * Checks if a string segment looks like an inline formula.
 * Must contain at least one math operator between word-like terms.
 */
function isFormula(text) {
  // Must contain an operator (=, ×, ÷) or arithmetic (+, -, *, /) between terms
  // Avoid matching plain prose with hyphens or slashes in normal words
  const hasEquals = /\w\s*=\s*\w/.test(text);
  const hasMathOp = /\w\s*[×÷]\s*\w/.test(text);
  const hasArithBetweenTerms = /[A-Z][a-zA-Z]*\s*[+\-*/]\s*[A-Z(]/.test(text);
  const hasParenFormula = /\(\s*\d+\s*[-+*/×÷]\s*\w/.test(text) || /\w\s*[-+*/×÷]\s*\d+\s*\)/.test(text);

  return hasEquals || hasMathOp || hasArithBetweenTerms || hasParenFormula;
}

/**
 * Splits a text line into segments, wrapping inline formulas in styled spans.
 * Uses a simpler, more targeted approach: find formula-like substrings and wrap them.
 */
function renderInlineFormulas(text, keyPrefix) {
  // Match formula patterns: "X = Y / Z", "ROE × (1 - payout)", etc.
  // Pattern: a sequence containing = or × or ÷ with terms around it
  const formulaRegex = /(?:[\w/()]+\s*[=×÷]\s*[\w/().\s×÷+\-*/]+)|(?:[\w/()]+\s*[+\-*/]\s*[\w/()]+(?:\s*[+\-*/×÷=]\s*[\w/().\s]+)*)/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  // Reset regex state
  formulaRegex.lastIndex = 0;

  while ((match = formulaRegex.exec(text)) !== null) {
    const candidate = match[0].trim();

    // Only style if it actually looks like a formula (has math operators between terms)
    if (!isFormula(candidate)) continue;

    // Skip very short matches or matches that are just normal words
    if (candidate.length < 5) continue;

    // Add text before this match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <span key={`${keyPrefix}-f-${match.index}`} className="inline-formula">
        {candidate}
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  // If no formulas found, return the original text
  if (parts.length === 0) return text;

  return parts;
}

/**
 * Renders a text string with rich formatting:
 * 1. Splits on \n\n into separate paragraphs
 * 2. Detects lines starting with "- " and groups them into <ul><li> lists
 * 3. Styles inline formulas with a monospace/highlighted treatment
 *
 * @param {string} text - The raw text content to format
 * @param {string} keyPrefix - A unique key prefix for React elements
 * @returns {React.ReactNode[]} Array of React elements
 */
export function renderFormattedText(text, keyPrefix = 'fmt') {
  if (!text || typeof text !== 'string') return text;

  const blocks = text.split('\n\n');
  const elements = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    // Check if this block is a list (all non-empty lines start with "- ")
    const lines = block.split('\n');
    const listLines = lines.filter(l => l.trim().startsWith('- '));
    const nonEmptyLines = lines.filter(l => l.trim().length > 0);

    if (listLines.length > 0 && listLines.length === nonEmptyLines.length) {
      // Render as a bullet list
      elements.push(
        <ul key={`${keyPrefix}-${i}`} className="formatted-list">
          {listLines.map((line, li) => (
            <li key={`${keyPrefix}-${i}-${li}`}>
              {renderInlineFormulas(line.trim().slice(2), `${keyPrefix}-${i}-${li}`)}
            </li>
          ))}
        </ul>
      );
    } else {
      // Render as a paragraph
      elements.push(
        <p key={`${keyPrefix}-${i}`}>
          {renderInlineFormulas(block, `${keyPrefix}-${i}`)}
        </p>
      );
    }
  }

  return elements;
}
