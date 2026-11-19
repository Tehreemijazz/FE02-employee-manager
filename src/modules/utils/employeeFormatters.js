/** Formatting helpers for employee information. */
import { formatDate, yearsSince } from './dateUtils.js';

export const formatSalary = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

export const formatEmployeeName = (employee) =>
  employee.name
    .trim()
    .split(/\s+/)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

export function formatEmployee(employee) {
  return {
    ...employee,
    name: formatEmployeeName(employee),
    salaryLabel: formatSalary(employee.salary),
    hireDateLabel: formatDate(employee.hireDate),
    tenureLabel: `${yearsSince(employee.hireDate)} yr`,
  };
}

export default formatEmployee;
