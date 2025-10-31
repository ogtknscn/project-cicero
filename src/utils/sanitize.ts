import DOMPurify from 'dompurify';

/**
 * Sanitization utilities for preventing XSS attacks
 * @module utils/sanitize
 */

/**
 * Sanitize HTML content to prevent XSS attacks using DOMPurify
 * @param {string} dirty - Untrusted HTML string
 * @param {string[]} allowedTags - Optional array of allowed HTML tags
 * @returns {string} Sanitized HTML string
 * @example
 * const clean = sanitizeHtml('<script>alert("xss")</script><p>Safe content</p>', ['p']);
 * // Returns: '<p>Safe content</p>'
 */
export const sanitizeHtml = (dirty: string, allowedTags?: string[]): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: allowedTags || [],
    ALLOWED_ATTR: [],
  });
};

/**
 * Sanitize text by escaping HTML entities
 */
export const sanitizeText = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Sanitize markdown content while preserving safe markdown syntax
 */
export const sanitizeMarkdown = (markdown: string): string => {
  return DOMPurify.sanitize(markdown, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'code', 'pre'],
    ALLOWED_ATTR: ['href'],
  });
};

/**
 * Strip all HTML tags from string
 */
export const stripHtml = (html: string): string => {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
};
