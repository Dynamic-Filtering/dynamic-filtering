import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    input,
    InputSignal,
    Output,
} from '@angular/core';
import { ButtonComponent } from '../../../button/button.component';
import { ComparisonOperation } from '../../../../../models/filtering/operations/comparison-operation.model';
import { NumberRangeFilter } from '../../../../../models/filtering/range-filter/number-range-filter.model';
import { SelectOption } from '../../../../../models/filtering/select-filter/select-option.model';
import { SelectMenuComponent } from '../../../select-menu/select-menu.component';
import { StringOperationFilter } from '../../../../../models/filtering/operation-filter/string-operation-filter.model';

@Component({
    selector: 'app-string-operation-filter',
    standalone: true,
    imports: [ButtonComponent, SelectMenuComponent],
    templateUrl: './string-operation-filter.component.html',
    styleUrl: './string-operation-filter.component.scss',
})
export class StringOperationFilterComponent {
    public filter: InputSignal<StringOperationFilter> =
        input.required<StringOperationFilter>();

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

    constructor(private elementRef: ElementRef) {}

    protected toggleContent(): void {
        if (this.firstToggle) {
            this.firstToggle = false;
        }

        this.showingContent = !this.showingContent;
    }

    protected applyHandler(): void {
        // Emit event??
        this.filter().apply('1', ComparisonOperation.GreaterThan);
        this.toggleContent();
    }
}
