import { CommonModule } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    input,
    InputSignal,
    Output,
} from '@angular/core';
import { ComparisonOperation } from '../../../../../models/filtering/operations/comparison-operation.model';
import { SelectOption } from '../../../../../models/filtering/select-filter/select-option.model';
import { AbstractFilterComponent } from '../../abstract-filter.component';
import { NumberRangeFilter } from '../../../../../models/filtering/range-filter/number-range-filter.model';
import { ButtonComponent } from '../../../button/button.component';
import { SelectMenuComponent } from '../../../select-menu/select-menu.component';

@Component({
    selector: 'app-number-range-filter',
    standalone: true,
    imports: [CommonModule, ButtonComponent, SelectMenuComponent],
    templateUrl: './number-range-filter.component.html',
    styleUrls: ['./number-range-filter.component.scss'],
})
export class NumberRangeFilterComponent extends AbstractFilterComponent {
    public filter: InputSignal<NumberRangeFilter> =
        input.required<NumberRangeFilter>();

    @Output() reset: EventEmitter<void> = new EventEmitter();

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
            1,
            ComparisonOperation.GreaterThan,
            2,
            ComparisonOperation.LowerThan,
        );
        this.toggleContent();
    }
}
