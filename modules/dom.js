// Kleine Helfer für das Arbeiten mit der Seite.

export const $ = (selector, root = document) => root.querySelector(selector);

export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
