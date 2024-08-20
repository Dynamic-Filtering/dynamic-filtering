import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterComponent } from './components/filters/filter.component';
import { Filter } from '../models/filtering/filter.model';
import { SelectFilter } from '../models/filtering/select-filter.model';
import { RangeFilter } from '../models/filtering/range-filter.model';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SelectFilterComponent } from './components/filters/select-filter/select-filter.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SelectMenuComponent } from './components/select-menu/select-menu.component';
import { SelectOption } from '../models/filtering/select-option.model';
import { Condition } from '../models/condition.model';
import { HttpParams } from '@angular/common/http';

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
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    protected filters: Filter<any>[] = [
        new SelectFilter('SelectFilter', 'column1', [
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
        new RangeFilter('RangeFilter', 'column2'),
    ];

    public options: SelectOption<number>[] = [
        {
            id: 1,
            value: 1,
            label: 'Label1',
        },
        {
            id: 2,
            value: 2,
            label: 'Label2',
        },
        {
            id: 3,
            value: 3,
            label: 'Label3',
        },
        {
            id: 4,
            value: 4,
            label: 'Label4',
        },
    ];

    public optionSelectedHandler(option: SelectOption<unknown>): void {
        console.log('Reached final stop');
        console.log('Selected option', option);
    }

    public logFilters(): void {
        console.log(this.filters);

        const activeConditions = this.filters
            .filter((filter: Filter<unknown>) =>
                filter.Conditions.every(
                    (condition: Condition<unknown>) =>
                        condition.value !== undefined,
                ),
            )
            .flatMap((filter: Filter<unknown>) => filter.Conditions);

        console.log('Active conditions:', activeConditions);
        console.log('Http params', this.formatToHttpParams(activeConditions));
    }

    private formatToHttpParams(activeConditions: Condition<any>[]): HttpParams {
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
