import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    input,
    InputSignal,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { AbstractFilterDirective } from './abstract-filter.directive';
import { Filter } from '../../models/filtering/filter.model';
import { ComparisonOperation } from '../../models/filtering/operations/comparison-operation.model';
import { EqualOperation } from '../../models/filtering/operations/equal-operation.model';
import { LikeOperation } from '../../models/filtering/operations/like-operation.model';

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [CommonModule],
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

    public componentMap: InputSignal<Map<any, any>> = input.required();

    @ViewChild('filterContainer', { read: ViewContainerRef })
    private filterContainer!: ViewContainerRef;

    // private componentMap = new Map<any, any>([
    //     [SingleSelectFilter, SingleSelectFilterComponent],
    //     [MultiSelectFilter, MultiSelectFilterComponent],
    //     [NumberRangeFilter, NumberRangeFilterComponent],
    //     [DateRangeFilter, DateRangeFilterComponent],
    //     [StringOperationFilter, StringOperationFilterComponent],
    //     [NumberOperationFilter, NumberOperationFilterComponent],
    //     [DateOperationFilter, DateOperationFilterComponent],
    // ]);

    private eventMap = new Map<string, Function>([
        ['onReset', () => this.reset()],
        ['onApply', () => this.apply()],
    ]);

    public ngAfterViewInit() {
        this.loadComponent();
    }

    private loadComponent() {
        for (let componentMapping of this.componentMap().entries()) {
            const filterType: any = componentMapping[0];

            if (this.filter() instanceof filterType) {
                const componentRef = this.filterContainer.createComponent(
                    componentMapping[1]
                );
                const componentRefAsAny: any = componentRef.instance;
                componentRefAsAny.filter = this.filter;

                for (let eventMapping of this.eventMap.entries()) {
                    if (componentRefAsAny[eventMapping[0]]) {
                        componentRefAsAny[eventMapping[0]].subscribe(
                            (event: any) => {
                                eventMapping[1](event);
                            }
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
