import { CommonModule } from '@angular/common';
import {
    Component,
    ElementRef,
    HostListener,
    input,
    InputSignal,
} from '@angular/core';
import { ComparisonOperation } from '../../../../../models/filtering/operations/comparison-operation.model';
import { SelectOption } from '../../../../../models/filtering/select-filter/select-option.model';
import { AbstractFilterComponent } from '../../abstract-filter.component';
import { DateRangeFilter } from '../../../../../models/filtering/range-filter/date-range-filter.model';
import { ButtonComponent } from '../../../button/button.component';
import { SelectMenuComponent } from '../../../select-menu/select-menu.component';

@Component({
    selector: 'app-date-range-filter',
    standalone: true,
    imports: [CommonModule, ButtonComponent, SelectMenuComponent],
    templateUrl: './date-range-filter.component.html',
    styleUrls: ['./date-range-filter.component.scss'],
})
export class DateRangeFilterComponent extends AbstractFilterComponent {
    public filter: InputSignal<DateRangeFilter> =
        input.required<DateRangeFilter>();

    protected firstToggle: boolean = true;
    public showingContent: boolean = false;
    public filterOptions: SelectOption<ComparisonOperation>[] = [
        {
            id: 1,
            label: '>',
            value: ComparisonOperation.GreaterThan,
        },
        {
            id: 2,
            label: '>=',
            value: ComparisonOperation.GreaterThanOrEqual,
        },
        {
            id: 3,
            label: '<',
            value: ComparisonOperation.LowerThan,
        },
        {
            id: 4,
            label: '<=',
            value: ComparisonOperation.LowerThanOrEqual,
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
        if (this.firstToggle) {
            this.firstToggle = false;
        }

        this.showingContent = !this.showingContent;
    }

    protected applyHandler(): void {
        // Emit event??
        this.filter().apply(
            new Date(),
            ComparisonOperation.GreaterThan,
            new Date(),
            ComparisonOperation.LowerThan,
        );
        this.toggleContent();
    }
}
