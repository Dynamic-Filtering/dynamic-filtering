import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    input,
    InputSignal,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Filter } from '../../../../models/filtering/filter.model';
import { SingleSelectFilterComponent } from '../select-filter/single-select-filter/single-select-filter.component';
import { SingleSelectFilter } from '../../../../models/filtering/select-filter/single-select-filter.model';
import { AbstractOperationFilter } from '../../../../models/filtering/operation-filter/abstract-operation-filter.model';
import { AbstractFilterDirective } from './abstract-filter.directive';
import { ComparisonOperation } from '../../../../models/filtering/operations/comparison-operation.model';
import { EqualOperation } from '../../../../models/filtering/operations/equal-operation.model';
import { LikeOperation } from '../../../../models/filtering/operations/like-operation.model';
import { NumberRangeFilter } from '../../../../models/filtering/range-filter/number-range-filter.model';
import { NumberRangeFilterComponent } from '../range-filter/number-range-filter/number-range-filter.component';
import { DateRangeFilter } from '../../../../models/filtering/range-filter/date-range-filter.model';
import { DateRangeFilterComponent } from '../range-filter/date-range-filter/date-range-filter.component';
import { StringOperationFilterComponent } from '../operation-filter/string-operation-filter/string-operation-filter.component';
import { NumberOperationFilter } from '../../../../models/filtering/operation-filter/number-operation-filter.model';
import { NumberOperationFilterComponent } from '../operation-filter/number-operation-filter/number-operation-filter.component';
import { DateOperationFilter } from '../../../../models/filtering/operation-filter/date-operation-filter.model';
import { DateOperationFilterComponent } from '../operation-filter/date-operation-filter/date-operation-filter.component';
import { MultiSelectFilter } from '../../../../models/filtering/select-filter/multi-select-filter.model';
import { MultiSelectFilterComponent } from '../select-filter/multi-select-filter/multi-select-filter.component';
import { StringOperationFilter } from '../../../../models/filtering/operation-filter/string-operation-filter.model';

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [CommonModule, SingleSelectFilterComponent],
    templateUrl: './filter.component.html',
})
export class FilterComponent
    extends AbstractFilterDirective
    implements AfterViewInit
{
    // Input
    public filter: InputSignal<
        Filter<unknown, ComparisonOperation | EqualOperation | LikeOperation>
    > =
        input.required<
            Filter<
                unknown,
                ComparisonOperation | EqualOperation | LikeOperation
            >
        >();

    @ViewChild('filterContainer', { read: ViewContainerRef })
    private filterContainer!: ViewContainerRef;

    private componentMap = new Map<any, any>([
        [SingleSelectFilter, SingleSelectFilterComponent],
        [MultiSelectFilter, MultiSelectFilterComponent],
        [NumberRangeFilter, NumberRangeFilterComponent],
        [DateRangeFilter, DateRangeFilterComponent],
        [StringOperationFilter, StringOperationFilterComponent],
        [NumberOperationFilter, NumberOperationFilterComponent],
        [DateOperationFilter, DateOperationFilterComponent],
    ]);

    private eventMap = new Map<string, Function>([
        ['onReset', () => this.reset()],
        ['onApply', () => this.apply()],
    ]);

    public ngAfterViewInit() {
        this.loadComponent();
    }

    private loadComponent() {
        for (let componentMapping of this.componentMap.entries()) {
            const filterType: any = componentMapping[0];

            if (this.filter() instanceof filterType) {
                const componentRef = this.filterContainer.createComponent(
                    componentMapping[1],
                );
                const componentRefAsAny: any = componentRef.instance;
                componentRefAsAny.filter = this.filter;

                for (let eventMapping of this.eventMap.entries()) {
                    if (componentRefAsAny[eventMapping[0]]) {
                        componentRefAsAny[eventMapping[0]].subscribe(
                            (event: any) => {
                                eventMapping[1](event);
                            },
                        );
                    }
                }
            }
        }
    }

    protected reset(): void {
        console.log('Reset in filter.component.ts');
        this.onReset.emit();
    }

    protected apply(): void {
        console.log('Apply in filter.component.ts');
        this.onApply.emit();
    }
}
