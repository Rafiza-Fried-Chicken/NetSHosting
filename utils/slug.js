// utils/slug.js
'use strict';
/**
 * Generate a random slug string
 * @param {number} length - length of the slug (default 8)
 * @returns {string} random slug
 */
function generateSlug(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let slug = '';
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

module.exports = {
  generateSlug,
};
