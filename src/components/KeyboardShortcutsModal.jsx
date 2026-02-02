import React, { useState, useEffect, useCallback } from 'react';

const SHORTCUT_SECTIONS = [
  {
    title: 'Global',
    shortcuts: [
      { keys: ['/', ''], description: 'Focus search input' },
      { keys: ['?'], description: 'Show keyboard shortcuts' },
      { keys: ['Esc'], description: 'Close dropdown / blur input' },
    ],
  },
  {
    title: 'Screener Results Table',
    shortcuts: [
      { keys: ['\u2191', '\u2193'], description: 'Navigate rows' },
      { keys: ['\u2190', '\u2192'], description: 'Navigate columns' },
      { keys: ['Page Up', 'Page Down'], description: 'Jump 10 rows' },
      { keys: ['Home', 'End'], description: 'First / last column' },
      { keys: ['Ctrl+Home'], description: 'First row and column' },
      { keys: ['Ctrl+End'], description: 'Last row and column' },
    ],
  },
  {
    title: 'Financial Statement Tables',
    shortcuts: [
      { keys: ['\u2191', '\u2193', '\u2190', '\u2192'], description: 'Navigate cells' },
      { keys: ['Enter'], description: 'Pin / unpin column' },
      { keys: ['N'], description: 'Add note to cell' },
      { keys: ['Home', 'End'], description: 'First / last column' },
    ],
  },
];

function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = useCallback((e) => {
    // "?" (Shift+/) to toggle modal, but not when in inputs
    if (e.key === '?' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      setIsOpen(prev => !prev);
      return;
    }
    // Escape to close
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="shortcuts-overlay" onClick={() => setIsOpen(false)}>
      <div className="shortcuts-modal" onClick={e => e.stopPropagation()}>
        <div className="shortcuts-header">
          <h2>Keyboard Shortcuts</h2>
          <button className="shortcuts-close" onClick={() => setIsOpen(false)} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="shortcuts-body">
          {SHORTCUT_SECTIONS.map(section => (
            <div key={section.title} className="shortcuts-section">
              <h3>{section.title}</h3>
              <dl className="shortcuts-list">
                {section.shortcuts.map((shortcut, i) => (
                  <div key={i} className="shortcut-row">
                    <dt className="shortcut-keys">
                      {shortcut.keys.map((key, j) => (
                        <span key={j}>
                          {j > 0 && <span className="shortcut-separator">/</span>}
                          <kbd>{key}</kbd>
                        </span>
                      ))}
                    </dt>
                    <dd className="shortcut-desc">{shortcut.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <div className="shortcuts-footer">
          Press <kbd>?</kbd> to toggle this dialog
        </div>
      </div>
    </div>
  );
}

export default KeyboardShortcutsModal;
