import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Filter } from '../models/filtering/filter.model';
import { SelectFilter } from '../models/filtering/select-filter/select-filter.model';
import { AbstractRangeFilter } from '../models/filtering/range-filter/abstract-range-filter.model';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SelectFilterComponent } from './components/filters/select-filter/select-filter.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SelectMenuComponent } from './components/select-menu/select-menu.component';
import { SelectOption } from '../models/filtering/select-filter/select-option.model';
import { Condition } from '../models/condition.model';
import { HttpParams } from '@angular/common/http';
import { NumberRangeFilter } from '../models/filtering/range-filter/number-range-filter.model';
import { DateRangeFilter } from '../models/filtering/range-filter/date-range-filter.model';
import { FilterComponent } from './components/filters/filter/filter.component';
import { FilterManagementComponent } from './components/filters/filter-manager/filter-manager.component';
import { FilterManagerService } from './components/filters/filter-manager/filter-manager.service';
import { StringOperationFilter } from '../models/filtering/operation-filter/string-operation-filter.model';
import { ComparisonOperation } from '../models/filtering/operations/comparison-operation.model';
import { EqualOperation } from '../models/filtering/operations/equal-operation.model';
import { LikeOperation } from '../models/filtering/operations/like-operation.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        FilterComponent,
        CommonModule,
        ButtonComponent,
        SelectFilterComponent,
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
        new SelectFilter('column1', 'SelectFilter', [
            {
                id: 1,
                value: 1,
                label: 'NL',
            },
            {
                id: 2,
                value: 2,
                label: 'BE',
            },
            {
                id: 3,
                value: 3,
                label: 'DE',
            },
            {
                id: 4,
                value: 4,
                label: 'CZ',
            },
            {
                id: 5,
                value: 5,
                label: 'PO',
            },
            {
                id: 6,
                value: 6,
                label: 'US',
            },
            {
                id: 7,
                value: 7,
                label: 'GB',
            },
        ]),
        new NumberRangeFilter('column2', 'NumberRangeFilter'),
        new DateRangeFilter('column3', 'DateRangeFilter'),
        new StringOperationFilter('column4', 'StringOperationFilter'),
    ];

    constructor(
        protected readonly filterManagementManager: FilterManagerService,
    ) {
        this.filterManagementManager.setFilters(this.filters);

        // Way to bind events from the filter models directly
        this.filters[0].onReset.subscribe(() => {
            console.log('Reset caught from filter ref');
        });
    }

    private formatToHttpParams(
        activeConditions: Condition<
            any,
            ComparisonOperation | EqualOperation | LikeOperation
        >[],
    ): HttpParams {
        let httpParams = new HttpParams();
        activeConditions.forEach;

        for (let index = 0; index < activeConditions.length; index++) {
            httpParams = httpParams.set(
                `Filters[${index}].Column`,
                activeConditions[index].column,
            );
            httpParams = httpParams.set(
                `Filters[${index}].Operation`,
                activeConditions[index].operation,
            );
            httpParams = httpParams.set(
                `Filters[${index}].Value`,
                activeConditions[index].value,
            );
        }

        return httpParams;
    }
}
