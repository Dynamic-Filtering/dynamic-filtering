import { CommonModule } from '@angular/common';
import {
    Component,
    ElementRef,
    HostListener,
    input,
    InputSignal,
} from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { AbstractFilterComponent } from '../abstract-filter.component';
import { SelectMenuComponent } from '../../select-menu/select-menu.component';
import { RangeOperation } from '../../../../models/filtering/range-operation.model';
import { SelectOption } from '../../../../models/filtering/select-option.model';
import { RangeFilter } from '../../../../models/filtering/range-filter.model';
import { Condition } from '../../../../models/condition.model';

@Component({
    selector: 'app-range-filter',
    standalone: true,
    imports: [CommonModule, ButtonComponent, SelectMenuComponent],
    templateUrl: './range-filter.component.html',
    styleUrls: ['./range-filter.component.scss'],
})
export class RangeFilterComponent extends AbstractFilterComponent {
    public filter: InputSignal<RangeFilter<number | Date>> =
        input.required<RangeFilter<number | Date>>();

    public showingContent: boolean = false;
    public filterOptions: SelectOption<RangeOperation>[] = [
        {
            id: 1,
            label: '>',
            value: RangeOperation.GreaterThan,
        },
        {
            id: 2,
            label: '>=',
            value: RangeOperation.GreaterThanOrEqual,
        },
        {
            id: 3,
            label: '<',
            value: RangeOperation.LowerThan,
        },
        {
            id: 4,
            label: '<=',
            value: RangeOperation.LowerThanOrEqual,
        },
    ];

    @HostListener('document:click', ['$event'])
    clickOutside(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.showingContent = false;
        }
    }

    constructor(private elementRef: ElementRef) {
        super();
    }

    protected toggleContent(): void {
        this.showingContent = !this.showingContent;
    }

    protected applyHandler(): void {
        // Emit event??
        this.filter().setRange(
            1,
            RangeOperation.GreaterThan,
            2,
            RangeOperation.LowerThan,
        );
        this.toggleContent();
    }
}
