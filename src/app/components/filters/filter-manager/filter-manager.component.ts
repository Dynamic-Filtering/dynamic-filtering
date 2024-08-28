import {
    Component,
    computed,
    EventEmitter,
    input,
    InputSignal,
    output,
    OutputEmitterRef,
    Signal,
} from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { HttpParams } from '@angular/common/http';
import { Condition } from '../../../../models/condition.model';
import { Filter } from '../../../../models/filtering/filter.model';
import { CommonModule } from '@angular/common';
import { FilterManagerService } from './filter-manager.service';

@Component({
    selector: 'app-filter-manager',
    standalone: true,
    imports: [CommonModule, FilterComponent],
    templateUrl: './filter-manager.component.html',
    styleUrl: './filter-manager.component.scss',
})
// TODO:
// - Support adding new filters (take mapping of columns and the supported filter variants, but would be hard with select filter inputs)
export class FilterManagementComponent {
    // // Input (Should we use input or model??)
    // public filters: InputSignal<Filter<unknown>[]> =
    //     input.required<Filter<unknown>[]>();

    public change: OutputEmitterRef<Filter<unknown>[]> =
        output<Filter<unknown>[]>();

    constructor(
        protected readonly filterManagementManager: FilterManagerService,
    ) {}

    protected filtersChanged() {
        this.change.emit(this.filterManagementManager.filters());
        this.filterManagementManager.setFilters(
            this.filterManagementManager.filters(),
        );
    }
}
