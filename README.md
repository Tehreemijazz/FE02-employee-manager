# Employee Manager (FE02)

A modular vanilla-JavaScript app for managing employees, built with ES modules.

## Features

- Create, update, delete and list employees
- Search by name and filter by department
- Reusable validators (`src/modules/validation`)
- Date / employee formatting utilities (`src/modules/utils`)
- Optional CSV export loaded with a **dynamic import** (only fetched on click)
- ESLint (flat config) + Prettier

## Getting started

npm install
npm start          # serves the folder (ES modules need http://, not file://)
npm run lint       # check code quality
npm run lint:fix   # auto-fix lint issues
npm run format     # format with Prettier

## Folder structure

```
employee-manager/
├── index.html              # HTML entry; loads src/main.js as type="module"
├── eslint.config.js        # ESLint rules
├── .prettierrc             # Prettier rules
├── package.json            # scripts + dev dependencies ("type": "module")
└── src/
    ├── main.js             # application entry point (wires everything)
    ├── data/seed.js        # sample data
    ├── styles/main.css
    ├── ui/render.js        # DOM rendering only (separation of concerns)
    └── modules/
        ├── employees/      # CRUD + search      (+ index.js barrel)
        ├── departments/    # valid departments  (+ index.js barrel)
        ├── validation/     # reusable validators(+ index.js barrel)
        ├── utils/          # date + employee formatting, ids (+ index.js)
        └── optional/       # exportCsv.js, loaded via import()
```

## Module concepts used

| Concept                       | Where                                                                 |
| ----------------------------- | --------------------------------------------------------------------- |
| Named exports                 | `validators.js`, `employeeService.js`, `dateUtils.js`                 |
| Default exports               | `validateEmployee`, `formatEmployee`, `getDepartments`, `downloadCsv` |
| Re-exporting / barrel files   | every `index.js` (`export * from`, `export { default as x }`)         |
| Dynamic import / lazy loading | `handleExport()` in `src/main.js`                                     |
| Module scope + strict mode    | ES modules are strict and file-scoped automatically                   |

## Dependency direction (no circular imports)

`main → ui, employees → validation → departments`, and `employees, ui → utils`.
Dependencies only point downward, so there are no circular dependencies.
