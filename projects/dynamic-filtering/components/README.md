# Dynamic filtering components 🔎

Dynamic Filtering components provides pre-built (angular) UI components for the filter types defined in the [Dynamic Filtering core package](https://www.npmjs.com/package/@dynamic-filtering/core). It allows developers to easily add filtering options to their applications without building them from scratch. These components let users create, update, and remove filters through a simple interface, making it easier to manage dynamic filters for tasks like data searching and querying.

Features include:

-   Filter components: Components for each filter type defined in the core package (e.g. `StringOperationFilterComponent`, `DateRangeFilterComponent`).
-   Filter manager and proxy components: Components for handling the Filter components in a uniform way.

# Installing ⬇️

```shell
npm install @dynamic-filtering/components
```

# Usage 🕑

The `FilterManagerComponent` is the starting point for managing your filters. Using it is pretty easy. You only need to provide the initial filters (active or inactive ones) and your mapping of which filter type should render which UI component (e.g. `StringOperationFilter` -> `StringOperationFilterComponent`).

```html
<app-filter-manager
    [filters]="filters"
    [componentMap]="componentMap"
></app-filter-manager>
```

```typescript
protected filters: Filter<
        unknown,
        ComparisonOperation | EqualOperation | LikeOperation | InOperation
    >[] = [
        new SingleSelectFilter("column1", "SingleSelectFilter", [
            new SelectOption("NL", 1),
            new SelectOption("BE", 2),
            new SelectOption("DE", 3),
            new SelectOption("CZ", 4),
            new SelectOption("PO", 5),
            new SelectOption("US", 6),
            new SelectOption("GB", 7),
        ]),
        new NumberRangeFilter("column2", "NumberRangeFilter"),
        new DateRangeFilter("column3", "DateRangeFilter"),
        new StringOperationFilter("column4", "StringOperationFilter"),
        new MultiSelectFilter("column5", "MultiSelectFilter", [
            new MultiSelectOption("NL", 1),
            new MultiSelectOption("BE", 2),
            new MultiSelectOption("DE", 3),
            new MultiSelectOption("CZ", 4),
            new MultiSelectOption("PO", 5),
            new MultiSelectOption("US", 6),
            new MultiSelectOption("GB", 7),
        ]),
    ];

protected componentMap = new Map<unknown, unknown>([
        [SingleSelectFilter, SingleSelectFilterComponent],
        [MultiSelectFilter, MultiSelectFilterComponent],
        [NumberRangeFilter, NumberRangeFilterComponent],
        [DateRangeFilter, DateRangeFilterComponent],
        [StringOperationFilter, StringOperationFilterComponent],
        [NumberOperationFilter, NumberOperationFilterComponent],
        [DateOperationFilter, DateOperationFilterComponent],
    ]);
```

# Copyright and license

Code is released under the [MIT License](https://github.com/JobHaast/dynamic-filtering/blob/main/LICENSE).
