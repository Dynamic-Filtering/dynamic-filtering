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

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [CommonModule, SelectFilterComponent],
    templateUrl: './filter.component.html',
})
export class FilterComponent implements AfterViewInit {
    // Input
    public filter: InputSignal<Filter<unknown>> =
        input.required<Filter<unknown>>();

    // Output
    public optionSelected: OutputEmitterRef<any> = output<any>(); // Some sort of select option type
    public reset: OutputEmitterRef<void> = output<void>();

    @ViewChild('filterContainer', { read: ViewContainerRef })
    filterContainer!: ViewContainerRef;

    private componentMap = new Map<any, any>([
        [SelectFilter, SelectFilterComponent],
        [RangeFilter, RangeFilterComponent],
        [OperationFilter, OperationFilterComponent],
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
                const componentRefAsAny: any = componentRef.instance as any;
                componentRefAsAny.filter = this.filter;

                if (componentRefAsAny.optionSelected) {
                    componentRefAsAny.optionSelected.subscribe(
                        (option: SelectOption<unknown>) => {
                            this.optionSelectedHandler(option);
                        },
                    );
                }
            }
        }
    }

    protected optionSelectedHandler(option: SelectOption<unknown>): void {
        console.log('Event caucht from child and re-emitted');
        this.optionSelected.emit(option);
    }

    protected resetHandler(): void {
        console.log('Event caucht from child and re-emitted');
        this.reset.emit();
    }
}
