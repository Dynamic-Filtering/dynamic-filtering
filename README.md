<p align="center">
  <img src="./dynamic-filtering-logo.svg" alt="Dynamic filtering logo" width="150" height="150">
</p>

<h3 align="center">Dynamic filtering</h3>

<p align="center">
  Filtering made a whole lot easier
  <br>
  <a href="https://github.com/JobHaast/dynamic-filtering/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml&title=Provide+a+summary+of+the+issue">Report a bug</a>
  ·
  <a href="https://github.com/JobHaast/dynamic-filtering/issues/new?assignees=&labels=feature&projects=&template=feature_request.yml&title=Suggest+a+new+feature">Request a feature</a>
</p>

# Dynamic filtering 🔎

Dynamic Filtering is a package that provides classes, interfaces, components, and services for managing filters in applications. It allows developers to create and apply filters dynamically, enabling the addition, removal, and modification of filters at runtime. The package supports building complex filter logic that is useful for data querying, search functionalities, and user-defined filtering rules.

Features include:

-   Classes and Interfaces: A base set of classes and interfaces for common filters supporting extension with your implementation.
-   Components: UI component for managing everything filter-related.
-   Services: Manage filter states, listen to changes, and programmatically add new filters.

# Installing ⬇️

```shell
npm install @dynamic-filtering/core
```

You only need to run the command below if you want to use the (Angular) components.

```shell
npm install @dynamic-filtering/components
```

# Usage 🕑

The `app-filter-manager` component is the visual component for adding, removing, and displaying your defined and to-be-defined filters. Using it is pretty easy. You only need to provide the initial filters (active or inactive ones) and your mapping between the filter types and your filter components:

```HTML
<app-filter-manager [filters]="filters" [componentMap]="componentMap"></app-filter-manager>
```

> Don't forget to import the component in your component file or module.

Most logic performed by the app filter manager is also accessible through its manager service. Using it is as easy as injecting it into your component. For example:

```typescript
constructor(protected readonly filterManagerService: FilterManagerService) {}
```

The manager service exposes useful properties like the currently active filters and conditions. Hooking into changes to these properties is pretty easy by utilizing Angular's signals. Listening to these changes might look something as follows:

```typescript
constructor(protected readonly filterManagerService: FilterManagerService) {
        effect(async () => {
            const activeConditions = this.filterManagerService.activeConditions()
            const httpParams = DynamicFilterService.formatConditionsToHttpParams(activeConditions, new HttpParams())
            await this.apiClient.fetchUsers(httpParams)
        })
    }
```

The active conditions resulting from the filters will need to be parsed into a useful format at some point. To do this we provide a helper class that helps format your filters into HTTP params:

```typescript
let httpParams = new HttpParams();
httpParams = DynamicFilterService.formatConditionsToHttpParams(
    conditions,
    httpParams,
);
httpParams = DynamicFilterService.formatSortingsToHttpParams(
    sortings,
    httpParams,
);
httpParams = DynamicFilterService.formatPaginationToHttpParams(
    pagination,
    httpParams,
);
```

There is also a single method that combines the three methods above into one:

```typescript
let httpParams = new HttpParams();
httpParams = DynamicFilterService.formatDynamicQueryOptionToHttpParams(
    dynamicQueryOption,
    httpParams,
);
```

# Copyright and license

Code is released under the [MIT License](https://github.com/JobHaast/dynamic-filtering/blob/main/LICENSE).

# Changelog

All notable changes to this project will be documented in the [CHANGELOG](./CHANGELOG.md).
