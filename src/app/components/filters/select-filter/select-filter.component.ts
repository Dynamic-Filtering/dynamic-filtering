import { CommonModule } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    input,
    InputSignal,
    Output,
} from '@angular/core';
import { SelectFilter } from '../../../../models/filtering/select-filter.model';
import { AbstractFilterComponent } from '../abstract-filter.component';
import { ButtonComponent } from '../../button/button.component';
import { SelectOption } from '../../../../models/filtering/select-option.model';

@Component({
    selector: 'app-select-filter',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './select-filter.component.html',
    styleUrls: ['./select-filter.component.scss'],
})
export class SelectFilterComponent extends AbstractFilterComponent {
    public filter: InputSignal<SelectFilter<unknown>> =
        input.required<SelectFilter<unknown>>();
    protected showingConent: boolean = false;
    protected selectedOption?: SelectOption<unknown> = undefined;

    @Output() optionSelected: EventEmitter<SelectOption<unknown>> =
        new EventEmitter();
    @Output() reset: EventEmitter<void> = new EventEmitter();
    @Output() input: EventEmitter<any> = new EventEmitter();

    @HostListener('document:click', ['$event'])
    clickOutside(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.showingConent = false;
        }
    }

    constructor(private elementRef: ElementRef) {
        super();
    }

    protected toggleConent(): void {
        this.showingConent = !this.showingConent;
    }

    protected optionSelectedHandler(option: SelectOption<unknown>): void {
        // When we select an option the filter should become active
        // We should also add a clear icon button
        this.selectedOption = option;
        this.filter().selectValue(option.id);
        this.optionSelected.emit(option);
        this.toggleConent();
    }

    protected resetHandler(): void {
        // When we reset the filter should become inactive
        // We should also remove the clear icon button
        this.selectedOption = undefined;
        this.filter().resetValue();
        this.reset.emit();
        this.toggleConent();
    }

    protected changeInput(event: any): void {
        this.input.emit(event);
    }
}
