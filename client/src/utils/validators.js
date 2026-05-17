export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const required = (value) => String(value || '').trim().length > 0;

