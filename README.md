# Dynamic filtering 🔎

Dynamic Filtering is a package that provides classes, interfaces, components, and services for managing filters in applications. It allows developers to create and apply filters dynamically, enabling the addition, removal, and modification of filters at runtime. The package supports building complex filter logic, useful for data querying, search functionalities, and user-defined filtering rules.

Features include:

-   Classes and Interfaces: A base set of classes and interfaces for common filters supporting extension with your own implementation.
-   Components: UI component for managing everything filter related.
-   Services: Manage filter states, listen to changes, and programatically add new filters.

# Installing ⬇️

// Include installation guide

```bash
npm install dynamic-filtering
```

# Usage 🕑

The app filter manager component is the visual component for (possibly) adding, removing and displaying your defined and to be defined filters. Using it is pretty easy. You only need to provide the current filters (active or inactive ones) as shown below:

```ts
<app-filter-manager [filters]="filters"></app-filter-manager>
```

> It's a standalone component so don't forget to import it in your component file.

Most logic performed by the app filter manager is also accessable through it's manager service. Using it is as easy as injecting it into your component. For example:

```ts
constructor(protected readonly filterManagementManager: FilterManagerService) {}
```
