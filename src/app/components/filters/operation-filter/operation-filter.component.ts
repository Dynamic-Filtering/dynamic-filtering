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
import { AbstractFilterDirective } from '../filter/abstract-filter.directive';

@Component({
    selector: 'app-operation-filter',
    standalone: true,
    imports: [],
    templateUrl: './operation-filter.component.html',
    styleUrl: './operation-filter.component.scss',
})
export class OperationFilterComponent extends AbstractFilterDirective {
    // Input
    public filter: InputSignal<RangeFilter<any>> =
        input.required<RangeFilter<any>>();

    @ViewChild('filterContainer', { read: ViewContainerRef })
    private filterContainer!: ViewContainerRef;

    private componentMap = new Map<any, any>([
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
        console.log('Reset in operation-filter.component.ts');
        this.onReset.emit();
    }

    protected apply(): void {
        console.log('Apply in operation-filter.component.ts');
        this.onApply.emit();
    }
}
