<p align="center">
  <a href="https://getbootstrap.com/">
    <img src="./dynamic-filtering-logo.svg" alt="Dynamic filtering logo" width="150" height="150">
  </a>
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

Dynamic Filtering is a package that provides classes, interfaces, components, and services for managing filters in applications. It allows developers to create and apply filters dynamically, enabling the addition, removal, and modification of filters at runtime. The package supports building complex filter logic that is useful for data querying, search functionalities, and user-defined filtering rules.

Features include:

-   Classes and Interfaces: A base set of classes and interfaces for common filters supporting extension with your implementation.
-   Components: UI component for managing everything filter-related.
-   Services: Manage filter states, listen to changes, and programmatically add new filters.

# Installing ⬇️

```shell
npm install dynamic-filtering
```

# Usage 🕑

The app filter manager component is the visual component for adding, removing and displaying your defined and to be defined filters. Using it is pretty easy. You only need to provide the initial filters (active or inactive ones) as shown below:

```HTML
<app-filter-manager [filters]="filters"></app-filter-manager>
```

> Don't forget to import the component in your component file or module.

Most logic performed by the app filter manager is also accessible through its manager service. Using it is as easy as injecting it into your component. For example:

```ts
constructor(protected readonly filterManagementManager: FilterManagerService) {}
```

The manager service exposes useful properties like the currently active filters and conditions. Hooking into changes to these properties is pretty easy by utilizing Angular's signals. Usage of listening to these changes might look something as follows:

```ts
constructor(protected readonly filterManagementManager: FilterManagerService) {
        effect(async () => {
            const activeConditions = this.filterManagementManager.activeConditions()
            const httpParams = DynamicFilterService.formatConditionsToHttpParams(activeConditions, new HttpParams())
            await this.apiClient.fetchUsers(httpParams)
        })
    }
```

The active conditions resulting from the filters will need to be parsed into a useful format at some point. To do this we provide a helper class that helps format your filters into http params. Examples:

```ts
let httpParams = new HttpParams();
httpParams = DynamicFilterService.formatConditionsToHttpParams(conditions, httpParams);
httpParams = DynamicFilterService.formatSortingsToHttpParams(sortings, httpParams);
httpParams = DynamicFilterService.formatPaginationToHttpParams(pagination, httpParams);
```

There is also a single method that combines the three methods above into one:

```ts
let httpParams = new HttpParams();
httpParams = DynamicFilterService.formatDynamicQueryOptionToHttpParams(dynamicQueryOption, httpParams);
```

# Copyright and license

Code is released under the [MIT License](https://github.com/JobHaast/dynamic-filtering/blob/main/LICENSE).