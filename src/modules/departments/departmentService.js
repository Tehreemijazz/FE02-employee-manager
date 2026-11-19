/** Departments module: the single source of truth for valid departments. */

export const DEPARTMENTS = Object.freeze([
  'Engineering',
  'Human Resources',
  'Marketing',
  'Sales',
  'Finance',
]);

export function getDepartments() {
  return [...DEPARTMENTS];
}

export function isValidDepartment(name) {
  return DEPARTMENTS.includes(name);
}

export function countByDepartment(employees) {
  return DEPARTMENTS.reduce((counts, department) => {
    counts[department] = employees.filter(
      (employee) => employee.department === department,
    ).length;
    return counts;
  }, {});
}

// Default export: the module's main "thing"
export default getDepartments;
