/** UI layer: turns data into DOM. Contains no business logic. */
import { formatEmployee } from '../modules/utils/index.js';

const escapeHtml = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ],
  );

export function renderDepartmentOptions(select, departments, placeholder) {
  select.innerHTML = [
    `<option value="">${escapeHtml(placeholder)}</option>`,
    ...departments.map(
      (name) =>
        `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`,
    ),
  ].join('');
}

export function renderEmployeeRows(tbody, employees) {
  tbody.innerHTML = employees
    .map(formatEmployee)
    .map(
      (e) => `
      <tr>
        <td>${escapeHtml(e.name)}<small>${escapeHtml(e.email)}</small></td>
        <td>${escapeHtml(e.department)}</td>
        <td>${escapeHtml(e.salaryLabel)}</td>
        <td>${escapeHtml(e.hireDateLabel)}<small>${escapeHtml(e.tenureLabel)}</small></td>
        <td>
          <div class="row-actions">
            <button class="btn btn--ghost btn--small" data-action="edit" data-id="${e.id}">Edit</button>
            <button class="btn btn--ghost btn--small btn--danger" data-action="delete" data-id="${e.id}">Delete</button>
          </div>
        </td>
      </tr>`,
    )
    .join('');
}

export function renderErrors(list, errors) {
  list.innerHTML = Object.values(errors)
    .map((message) => `<li>${escapeHtml(message)}</li>`)
    .join('');
}
