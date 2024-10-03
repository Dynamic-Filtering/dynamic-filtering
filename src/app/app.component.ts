import { Component, computed, Signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import {
    DateOperationFilter,
    DateRangeFilter,
    Filter,
    FilterManagerService,
    MultiSelectFilter,
    MultiSelectOption,
    NumberOperationFilter,
    NumberRangeFilter,
    SelectOption,
    SingleSelectFilter,
    StringOperationFilter,
    Condition,
    Operation,
} from "@dynamic-filtering/core";
import { HttpParams } from "@angular/common/http";
import {
    ButtonComponent,
    DateOperationFilterComponent,
    DateRangeFilterComponent,
    DropdownComponent,
    DynamicFilterService,
    FilterManagerComponent,
    MultiSelectFilterComponent,
    NumberOperationFilterComponent,
    NumberRangeFilterComponent,
    SelectMenuComponent,
    SingleSelectFilterComponent,
    StringOperationFilterComponent,
} from "@dynamic-filtering/components";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule,
        ButtonComponent,
        SingleSelectFilterComponent,
        DropdownComponent,
        SelectMenuComponent,
        FilterManagerComponent,
    ],
    providers: [FilterManagerService],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    protected filters: Filter<unknown, Operation>[] = [
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

    protected activeFilters: Signal<Filter<unknown, Operation>[]>;
    protected activeConditions: Signal<Condition<unknown, Operation>[]>;

    protected componentMap = new Map<unknown, unknown>([
        [SingleSelectFilter, SingleSelectFilterComponent],
        [MultiSelectFilter, MultiSelectFilterComponent],
        [NumberRangeFilter, NumberRangeFilterComponent],
        [DateRangeFilter, DateRangeFilterComponent],
        [StringOperationFilter, StringOperationFilterComponent],
        [NumberOperationFilter, NumberOperationFilterComponent],
        [DateOperationFilter, DateOperationFilterComponent],
    ]);

    protected urlResult: Signal<string> = computed(() => {
        let httpParams = new HttpParams();
        httpParams = DynamicFilterService.formatConditionsToHttpParams(
            this.activeConditions(),
            httpParams,
        );

        return httpParams.toString();
    });

    constructor(protected readonly filterManagerService: FilterManagerService) {
        // Way to bind events from the filter models directly
        this.filters[0].onReset.subscribe(() => {
            console.log("Reset caught from filter ref");
        });

        this.activeFilters = toSignal(
            this.filterManagerService.activeFilters$,
            { initialValue: [] },
        );
        this.activeConditions = toSignal(
            this.filterManagerService.activeConditions$,
            { initialValue: [] },
        );
    }

    public addFilter(): void {
        console.log("Adding filter");
        this.filterManagerService.addFilter(
            new StringOperationFilter("column6", "StringOperationFilter2"),
        );
    }

    public removeFilter(): void {
        console.log("Remove first filter");
        this.filterManagerService.removeFilter(0);
    }

    public resetFilters(): void {
        console.log("Reset filters");
        this.filterManagerService.resetFilters();
    }
}
