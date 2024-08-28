import {
    Component,
    EventEmitter,
    input,
    InputSignal,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { DateRangeFilter } from '../../../../models/filtering/range-filter/date-range-filter.model';
import { NumberRangeFilter } from '../../../../models/filtering/range-filter/number-range-filter.model';
import { RangeFilter } from '../../../../models/filtering/range-filter/range-filter.model';
import { DateRangeFilterComponent } from '../range-filter/date-range-filter/date-range-filter.component';
import { NumberRangeFilterComponent } from '../range-filter/number-range-filter/number-range-filter.component';
import { StringOperationFilter } from '../../../../models/filtering/operation-filter/string-operation-filter.model';
import { DateOperationFilter } from '../../../../models/filtering/operation-filter/date-operation-filter.model';
import { NumberOperationFilter } from '../../../../models/filtering/operation-filter/number-operation-filter.model';
import { DateOperationFilterComponent } from './date-operation-filter/date-operation-filter.component';
import { NumberOperationFilterComponent } from './number-operation-filter/number-operation-filter.component';
import { StringOperationFilterComponent } from './string-operation-filter/string-operation-filter.component';

@Component({
    selector: 'app-operation-filter',
    standalone: true,
    imports: [],
    templateUrl: './operation-filter.component.html',
    styleUrl: './operation-filter.component.scss',
})
export class OperationFilterComponent {
    public filter: InputSignal<RangeFilter<any>> =
        input.required<RangeFilter<any>>();

    @Output() reset: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('filterContainer', { read: ViewContainerRef })
    filterContainer!: ViewContainerRef;

    private componentMap = new Map<any, any>([
        [StringOperationFilter, StringOperationFilterComponent],
        [NumberOperationFilter, NumberOperationFilterComponent],
        [DateOperationFilter, DateOperationFilterComponent],
    ]);

    public ngAfterViewInit() {
        this.loadComponent();
    }

    private loadComponent() {
        for (let mapping of this.componentMap.entries()) {
            const filterType: any = mapping[0];
            if (this.filter() instanceof filterType) {
                const componentRef = this.filterContainer.createComponent(
                    mapping[1],
                );
                (componentRef.instance as any).filter = this.filter;
            }
        }
    }

    protected resetHandler(): void {
        console.log('Event caucht from child and re-emitted');
        this.reset.emit();
    }
}
