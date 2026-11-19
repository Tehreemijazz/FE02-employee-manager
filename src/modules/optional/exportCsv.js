/** Optional feature: only downloaded when the user clicks "Export CSV". */
import { formatDate } from '../utils/index.js';

const escapeCell = (cell) => `"${String(cell).replace(/"/g, '""')}"`;

export function toCsv(employees) {
  const header = ['Name', 'Email', 'Department', 'Salary', 'Hire date'];
  const rows = employees.map((e) => [
    e.name,
    e.email,
    e.department,
    e.salary,
    formatDate(e.hireDate),
  ]);
  return [header, ...rows]
    .map((row) => row.map(escapeCell).join(','))
    .join('\n');
}

export default function downloadCsv(employees, filename = 'employees.csv') {
  const blob = new Blob([toCsv(employees)], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
