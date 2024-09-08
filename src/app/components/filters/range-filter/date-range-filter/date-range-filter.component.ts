import { CommonModule } from '@angular/common';
import {
    Component,
    ElementRef,
    HostListener,
    input,
    InputSignal,
} from '@angular/core';
import { ButtonComponent } from '../../../button/button.component';
import { SelectMenuComponent } from '../../../select-menu/select-menu.component';
import { AbstractFilterDirective } from '../../../../../../projects/dynamic-filtering/src/lib/components/filter/abstract-filter.directive';
import {
    ComparisonOperation,
    DateRangeFilter,
    SelectOption,
} from 'dynamic-filtering';

@Component({
    selector: 'app-date-range-filter',
    standalone: true,
    imports: [CommonModule, ButtonComponent, SelectMenuComponent],
    templateUrl: './date-range-filter.component.html',
    styleUrls: ['./date-range-filter.component.scss'],
})
export class DateRangeFilterComponent extends AbstractFilterDirective {
    public filter: InputSignal<DateRangeFilter> =
        input.required<DateRangeFilter>();

    protected firstToggle: boolean = true;
    public showingContent: boolean = false;
    public filterOptions: SelectOption<ComparisonOperation>[] = [
        {
            label: '>',
            value: ComparisonOperation.GreaterThan,
        },
        {
            label: '>=',
            value: ComparisonOperation.GreaterThanOrEqual,
        },
        {
            label: '<',
            value: ComparisonOperation.LowerThan,
        },
        {
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

    protected apply(): void {
        this.filter().apply(
            new Date(),
            ComparisonOperation.GreaterThan,
            new Date(),
            ComparisonOperation.LowerThan
        );
        this.onApply.emit();
        this.toggleContent();
    }

    protected reset(): void {
        this.filter().reset();
        this.onReset.emit();
    }
}
