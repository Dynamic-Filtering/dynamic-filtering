import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    input,
    InputSignal,
    output,
    OutputEmitterRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Filter } from '../../../../models/filtering/filter.model';
import { RangeFilter } from '../../../../models/filtering/range-filter/range-filter.model';
import { SelectOption } from '../../../../models/filtering/select-filter/select-option.model';
import { RangeFilterComponent } from '../range-filter/range-filter.component';
import { SelectFilterComponent } from '../select-filter/select-filter.component';
import { SelectFilter } from '../../../../models/filtering/select-filter/select-filter.model';
import { OperationFilter } from '../../../../models/filtering/operation-filter/operation-filter.model';
import { OperationFilterComponent } from '../operation-filter/operation-filter.component';
import { AbstractFilterDirective } from './abstract-filter.directive';

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [CommonModule, SelectFilterComponent],
    templateUrl: './filter.component.html',
})
export class FilterComponent
    extends AbstractFilterDirective
    implements AfterViewInit
{
    // Input
    public filter: InputSignal<Filter<unknown>> =
        input.required<Filter<unknown>>();

    @ViewChild('filterContainer', { read: ViewContainerRef })
    private filterContainer!: ViewContainerRef;

    private componentMap = new Map<any, any>([
        [SelectFilter, SelectFilterComponent],
        [RangeFilter, RangeFilterComponent],
        [OperationFilter, OperationFilterComponent],
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
