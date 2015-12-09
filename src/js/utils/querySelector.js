/**
 * @param {String} selector
 * @param {DOMElement} [context = document]
 * @returns {DOMElement}
 */
export default function querySelector(selector, context = document) {
  return context.querySelector(selector);
}
