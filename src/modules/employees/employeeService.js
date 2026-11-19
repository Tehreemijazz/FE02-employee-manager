/** Employee module: in-memory CRUD + search. */
import { validateEmployee } from '../validation/index.js';
import { generateId } from '../utils/index.js';

let employees = [];

export function setEmployees(list) {
  employees = list.map((employee) => ({ ...employee }));
}

export function listEmployees() {
  return employees.map((employee) => ({ ...employee }));
}

export function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id) ?? null;
}

export function createEmployee(data) {
  const { valid, errors } = validateEmployee(data);
  if (!valid) {
    return { ok: false, errors };
  }
  const employee = {
    id: generateId(),
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    department: data.department,
    salary: Number(data.salary),
    hireDate: data.hireDate,
  };
  employees.push(employee);
  return { ok: true, employee: { ...employee } };
}

export function updateEmployee(id, changes) {
  const index = employees.findIndex((employee) => employee.id === id);
  if (index === -1) {
    return { ok: false, errors: { id: 'Employee not found.' } };
  }
  const merged = { ...employees[index], ...changes };
  const { valid, errors } = validateEmployee(merged);
  if (!valid) {
    return { ok: false, errors };
  }
  employees[index] = {
    ...merged,
    name: merged.name.trim(),
    email: merged.email.trim().toLowerCase(),
    salary: Number(merged.salary),
  };
  return { ok: true, employee: { ...employees[index] } };
}

export function deleteEmployee(id) {
  const before = employees.length;
  employees = employees.filter((employee) => employee.id !== id);
  return employees.length < before;
}

/** Search by name (partial, case-insensitive) and/or exact department. */
export function searchEmployees({ name = '', department = '' } = {}) {
  const query = name.trim().toLowerCase();
  return listEmployees().filter(
    (employee) =>
      (!query || employee.name.toLowerCase().includes(query)) &&
      (!department || employee.department === department),
  );
}

const employeeService = {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
};

export default employeeService;
