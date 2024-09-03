import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Filter } from '../models/filtering/filter.model';
import { SingleSelectFilter } from '../models/filtering/select-filter/single-select-filter.model';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SingleSelectFilterComponent } from './components/filters/select-filter/single-select-filter/single-select-filter.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SelectMenuComponent } from './components/select-menu/select-menu.component';
import { NumberRangeFilter } from '../models/filtering/range-filter/number-range-filter.model';
import { DateRangeFilter } from '../models/filtering/range-filter/date-range-filter.model';
import { FilterComponent } from './components/filters/filter/filter.component';
import { FilterManagementComponent } from './components/filters/filter-manager/filter-manager.component';
import { FilterManagerService } from './components/filters/filter-manager/filter-manager.service';
import { StringOperationFilter } from '../models/filtering/operation-filter/string-operation-filter.model';
import { ComparisonOperation } from '../models/filtering/operations/comparison-operation.model';
import { EqualOperation } from '../models/filtering/operations/equal-operation.model';
import { LikeOperation } from '../models/filtering/operations/like-operation.model';
import { MultiSelectFilter } from '../models/filtering/select-filter/multi-select-filter.model';
import { MultiSelectOption } from '../models/filtering/options/multi-select-option.model';
import { SelectOption } from '../models/filtering/options/select-option.model';

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
        FilterManagementComponent,
    ],
    providers: [FilterManagerService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    protected filters: Filter<
        any,
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
        new MultiSelectFilter('column1', 'MultiSelectFilter', [
            new MultiSelectOption('NL', 1),
            new MultiSelectOption('BE', 2),
            new MultiSelectOption('DE', 3),
            new MultiSelectOption('CZ', 4),
            new MultiSelectOption('PO', 5),
            new MultiSelectOption('US', 6),
            new MultiSelectOption('GB', 7),
        ]),
    ];

    constructor(
        protected readonly filterManagementManager: FilterManagerService,
    ) {
        // Way to bind events from the filter models directly
        this.filters[0].onReset.subscribe(() => {
            console.log('Reset caught from filter ref');
        });
    }
}
