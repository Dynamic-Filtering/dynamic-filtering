import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SingleSelectFilterComponent } from './components/filters/select-filter/single-select-filter/single-select-filter.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SelectMenuComponent } from './components/select-menu/select-menu.component';
import { DateOperationFilterComponent } from './components/filters/operation-filter/date-operation-filter/date-operation-filter.component';
import { NumberOperationFilterComponent } from './components/filters/operation-filter/number-operation-filter/number-operation-filter.component';
import { StringOperationFilterComponent } from './components/filters/operation-filter/string-operation-filter/string-operation-filter.component';
import { DateRangeFilterComponent } from './components/filters/range-filter/date-range-filter/date-range-filter.component';
import { NumberRangeFilterComponent } from './components/filters/range-filter/number-range-filter/number-range-filter.component';
import { MultiSelectFilterComponent } from './components/filters/select-filter/multi-select-filter/multi-select-filter.component';
import {
    ComparisonOperation,
    DateOperationFilter,
    DateRangeFilter,
    EqualOperation,
    Filter,
    FilterComponent,
    FilterManagerService,
    LikeOperation,
    MultiSelectFilter,
    MultiSelectOption,
    NumberOperationFilter,
    NumberRangeFilter,
    SelectOption,
    SingleSelectFilter,
    StringOperationFilter,
    FilterManagerComponent,
} from 'dynamic-filtering';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        FilterComponent,
        CommonModule,
        ButtonComponent,
        SingleSelectFilterComponent,
        DropdownComponent,
        SelectMenuComponent,
        FilterManagerComponent,
    ],
    providers: [FilterManagerService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    protected filters: Filter<
        unknown,
        ComparisonOperation | EqualOperation | LikeOperation
    >[] = [
        new SingleSelectFilter('column1', 'SingleSelectFilter', [
            new SelectOption('NL', 1),
            new SelectOption('BE', 2),
            new SelectOption('DE', 3),
            new SelectOption('CZ', 4),
            new SelectOption('PO', 5),
            new SelectOption('US', 6),
            new SelectOption('GB', 7),
        ]),
        new NumberRangeFilter('column2', 'NumberRangeFilter'),
        new DateRangeFilter('column3', 'DateRangeFilter'),
        new StringOperationFilter('column4', 'StringOperationFilter'),
        new MultiSelectFilter('column5', 'MultiSelectFilter', [
            new MultiSelectOption('NL', 1),
            new MultiSelectOption('BE', 2),
            new MultiSelectOption('DE', 3),
            new MultiSelectOption('CZ', 4),
            new MultiSelectOption('PO', 5),
            new MultiSelectOption('US', 6),
            new MultiSelectOption('GB', 7),
        ]),
    ];

    protected componentMap = new Map<any, any>([
        [SingleSelectFilter, SingleSelectFilterComponent],
        [MultiSelectFilter, MultiSelectFilterComponent],
        [NumberRangeFilter, NumberRangeFilterComponent],
        [DateRangeFilter, DateRangeFilterComponent],
        [StringOperationFilter, StringOperationFilterComponent],
        [NumberOperationFilter, NumberOperationFilterComponent],
        [DateOperationFilter, DateOperationFilterComponent],
    ]);

    constructor(protected readonly filterManagerService: FilterManagerService) {
        // Way to bind events from the filter models directly
        this.filters[0].onReset.subscribe(() => {
            console.log('Reset caught from filter ref');
        });
    }

    public addFilter(): void {
        console.log('Adding filter');
        this.filterManagerService.addFilter(
            new StringOperationFilter('column6', 'StringOperationFilter2')
        );
    }
}
