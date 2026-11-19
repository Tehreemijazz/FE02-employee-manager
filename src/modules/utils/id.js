let counter = 0;

/** Generates a unique id (timestamp + counter). */
export const generateId = (prefix = 'emp') =>
  `${prefix}-${Date.now().toString(36)}-${(counter += 1)}`;
