import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    input,
    InputSignal,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { SelectMenuComponent } from '../../select-menu/select-menu.component';
import { RangeFilter } from '../../../../models/filtering/range-filter/range-filter.model';
import { NumberRangeFilter } from '../../../../models/filtering/range-filter/number-range-filter.model';
import { DateRangeFilter } from '../../../../models/filtering/range-filter/date-range-filter.model';
import { NumberRangeFilterComponent } from './number-range-filter/number-range-filter.component';
import { DateRangeFilterComponent } from './date-range-filter/date-range-filter.component';
import { AbstractFilterDirective } from '../filter/abstract-filter.directive';

@Component({
    selector: 'app-range-filter',
    standalone: true,
    imports: [CommonModule, ButtonComponent, SelectMenuComponent],
    templateUrl: './range-filter.component.html',
})
export class RangeFilterComponent extends AbstractFilterDirective {
    public filter: InputSignal<RangeFilter<any>> =
        input.required<RangeFilter<any>>();

    @Output() reset: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('filterContainer', { read: ViewContainerRef })
    filterContainer!: ViewContainerRef;

    private componentMap = new Map<any, any>([
        [NumberRangeFilter, NumberRangeFilterComponent],
        [DateRangeFilter, DateRangeFilterComponent],
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
