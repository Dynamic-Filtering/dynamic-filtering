import { Component, output, OutputEmitterRef } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { Filter } from '../../../../models/filtering/filter.model';
import { CommonModule } from '@angular/common';
import { FilterManagerService } from './filter-manager.service';
import { ComparisonOperation } from '../../../../models/filtering/operations/comparison-operation.model';
import { EqualOperation } from '../../../../models/filtering/operations/equal-operation.model';
import { LikeOperation } from '../../../../models/filtering/operations/like-operation.model';

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
    public change: OutputEmitterRef<
        Filter<unknown, ComparisonOperation | EqualOperation | LikeOperation>[]
    > =
        output<
            Filter<
                unknown,
                ComparisonOperation | EqualOperation | LikeOperation
            >[]
        >();

    constructor(
        protected readonly filterManagerService: FilterManagerService,
    ) {}

    protected filtersChanged() {
        this.change.emit(this.filterManagerService.filters());
        this.filterManagerService.notify();
    }
}
