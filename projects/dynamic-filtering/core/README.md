# Dynamic filtering core 🔎

Dynamic Filtering core is the base of dynamic filtering that provides classes, interfaces and services for managing filters in applications. It allows developers to create and apply filters dynamically, enabling the addition, removal, and modification of filters at runtime. The package supports building complex filter logic that is useful for data querying, search functionalities, and user-defined filtering rules.

Features include:

-   Classes and Interfaces: A base set of classes and interfaces for common filters supporting extension with your implementation.
-   Services: Manage filter states, listen to changes, and programmatically add new filters.

# Installing ⬇️

```shell
npm install @dynamic-filtering/core
```

# Usage 🕑

The `FilterManagerService` is the starting point for adding, removing, replacing and reseting your defined and to be defined filters. Using it is pretty easy. You only need to provide the initial filters (active or inactive ones).

```typescript
const filters: Filter<
    unknown,
    ComparisonOperation | EqualOperation | LikeOperation | InOperation
>[] = [
    new SingleSelectFilter("country", "Country", [
        new SelectOption("NL", 1),
        new SelectOption("BE", 2),
        new SelectOption("DE", 3),
        new SelectOption("CZ", 4),
        new SelectOption("PO", 5),
        new SelectOption("US", 6),
        new SelectOption("GB", 7),
    ]),
    new NumberRangeFilter("price", "Price"),
    new DateRangeFilter("startdate", "Start date"),
    new StringOperationFilter("name", "Name"),
];

const filterManagerService: FilterManagerService = new FilterManagerService();
filterManagerService.setFilters(filters);
```

<!-- TODO: Rewrite according to new implementation -->

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

# Extension 🧩

Dynamic filtering core is based on several abstractions which allow you to extend the current filter type set with your own inplementation. Want to know more about the available abstractions and how to extend the current filter type set? [Click here](https://github.com/Dynamic-Filtering/dynamic-filtering/wiki/filter).

# Copyright and license

Code is released under the [MIT License](https://github.com/JobHaast/dynamic-filtering/blob/main/LICENSE).
