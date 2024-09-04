<p align="center">
  <!-- <a href="https://getbootstrap.com/">
    <img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png" alt="Bootstrap logo" width="200" height="165">
  </a> -->
    <span style="font-size: 72px;">🔎</span>
</p>

<h3 align="center">Dynamic filtering</h3>

<p align="center">
  Filtering made a whole lot easier
  <br>
  <a href="https://github.com/JobHaast/dynamic-filtering/issues/new">Report bug</a>
  ·
  <a href="https://github.com/JobHaast/dynamic-filtering/issues/new">Request feature</a>
</p>

# Dynamic filtering 🔎

Dynamic Filtering is a package that provides classes, interfaces, components, and services for managing filters in applications. It allows developers to create and apply filters dynamically, enabling the addition, removal, and modification of filters at runtime. The package supports building complex filter logic, useful for data querying, search functionalities, and user-defined filtering rules.

Features include:

-   Classes and Interfaces: A base set of classes and interfaces for common filters supporting extension with your own implementation.
-   Components: UI component for managing everything filter related.
-   Services: Manage filter states, listen to changes, and programatically add new filters.

# Installing ⬇️

```shell
npm install dynamic-filtering
```

# Usage 🕑

The app filter manager component is the visual component for adding, removing and displaying your defined and to be defined filters. Using it is pretty easy. You only need to provide the current filters (active or inactive ones) as shown below:

```html
<app-filter-manager [filters]="filters"></app-filter-manager>
```

> Don't forget to import the component in your component file or module.

Most logic performed by the app filter manager is also accessable through it's manager service. Using it is as easy as injecting it into your component. For example:

```ts
constructor(protected readonly filterManagementManager: FilterManagerService) {}
```

The manager services exposes some usefull properties like the current active filters and active conditions. Hooking into changes to these properties is pretty easy by utilizing Angular' singals. Usage of listening to these changes might look something as follows:

```ts
constructor(protected readonly filterManagementManager: FilterManagerService) {
        effect(async () => {
            const activeConditions = this.filterManagementManager.activeConditions()
            const httpParams = DynamicFilterService.formatConditionsToHttpParams(activeConditions, new HttpParams())
            await this.apiClient.fetchUsers(httpParams)
        })
    }
```
