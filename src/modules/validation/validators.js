/** Reusable, generic validators. Each returns true/false. */
import { isValidDepartment } from '../departments/index.js';

export const isRequired = (value) =>
  value !== undefined && value !== null && String(value).trim() !== '';

export const minLength = (value, min) =>
  String(value ?? '').trim().length >= min;

export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? ''));

export const isPositiveNumber = (value) =>
  Number.isFinite(Number(value)) && Number(value) > 0;

export const isValidDate = (value) => {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

export const isNotInFuture = (value) => new Date(value) <= new Date();

/**
 * Validates an employee object.
 * @returns {{ valid: boolean, errors: Record<string,string> }}
 */
export function validateEmployee(data) {
  const errors = {};

  if (!isRequired(data.name) || !minLength(data.name, 2)) {
    errors.name = 'Name must be at least 2 characters.';
  }
  if (!isValidEmail(data.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!isValidDepartment(data.department)) {
    errors.department = 'Choose a department from the list.';
  }
  if (!isPositiveNumber(data.salary)) {
    errors.salary = 'Salary must be a number greater than 0.';
  }
  if (!isValidDate(data.hireDate) || !isNotInFuture(data.hireDate)) {
    errors.hireDate = 'Hire date must be a valid date, not in the future.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export default validateEmployee;
