/** Application entry point: wires modules to the DOM. */
import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  searchEmployees,
  setEmployees,
  listEmployees,
} from './modules/employees/index.js';
import { getDepartments } from './modules/departments/index.js';
import { toInputDate } from './modules/utils/index.js';
import {
  renderDepartmentOptions,
  renderEmployeeRows,
  renderErrors,
} from './ui/render.js';
import { seedEmployees } from './data/seed.js';

const $ = (selector) => document.querySelector(selector);

const form = $('#employee-form');
const rows = $('#employee-rows');
const emptyState = $('#empty-state');
const searchInput = $('#search-name');
const filterSelect = $('#filter-department');
const errorList = $('#form-errors');
const submitBtn = $('#submit-btn');
const cancelBtn = $('#cancel-btn');
const formTitle = $('#form-title');

function refreshList() {
  const results = searchEmployees({
    name: searchInput.value,
    department: filterSelect.value,
  });
  renderEmployeeRows(rows, results);
  emptyState.hidden = results.length > 0;
}

function resetForm() {
  form.reset();
  form.elements.id.value = '';
  formTitle.textContent = 'Add employee';
  submitBtn.textContent = 'Add employee';
  cancelBtn.hidden = true;
  renderErrors(errorList, {});
}

function startEditing(id) {
  const employee = getEmployeeById(id);
  if (!employee) {
    return;
  }
  form.elements.id.value = employee.id;
  form.elements.name.value = employee.name;
  form.elements.email.value = employee.email;
  form.elements.department.value = employee.department;
  form.elements.salary.value = employee.salary;
  form.elements.hireDate.value = toInputDate(employee.hireDate);
  formTitle.textContent = 'Edit employee';
  submitBtn.textContent = 'Save changes';
  cancelBtn.hidden = false;
  form.elements.name.focus();
}

function handleSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const { id, ...fields } = data;
  const result = id ? updateEmployee(id, fields) : createEmployee(fields);

  if (!result.ok) {
    renderErrors(errorList, result.errors);
    return;
  }
  resetForm();
  refreshList();
}

function handleTableClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) {
    return;
  }
  const { action, id } = button.dataset;
  if (action === 'edit') {
    startEditing(id);
  } else if (action === 'delete') {
    deleteEmployee(id);
    refreshList();
  }
}

// Dynamic import: the CSV module is only fetched when first needed.
async function handleExport() {
  const { default: downloadCsv } =
    await import('./modules/optional/exportCsv.js');
  downloadCsv(listEmployees());
}

function init() {
  const departments = getDepartments();
  renderDepartmentOptions(
    form.elements.department,
    departments,
    'Select department',
  );
  renderDepartmentOptions(filterSelect, departments, 'All departments');

  setEmployees(seedEmployees);

  form.addEventListener('submit', handleSubmit);
  cancelBtn.addEventListener('click', resetForm);
  rows.addEventListener('click', handleTableClick);
  searchInput.addEventListener('input', refreshList);
  filterSelect.addEventListener('change', refreshList);
  $('#export-btn').addEventListener('click', handleExport);

  refreshList();
}

init();
