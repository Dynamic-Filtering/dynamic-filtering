import { CommonModule } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    input,
    InputSignal,
    model,
    output,
    Output,
    OutputEmitterRef,
} from '@angular/core';
import { SingleSelectFilter } from '../../../../../models/filtering/select-filter/single-select-filter.model';
import { ButtonComponent } from '../../../button/button.component';
import { AbstractFilterDirective } from '../../filter/abstract-filter.directive';
import { SelectOption } from '../../../../../models/filtering/options/select-option.model';

@Component({
    selector: 'app-select-filter',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './single-select-filter.component.html',
    styleUrls: ['./single-select-filter.component.scss'],
})
export class SingleSelectFilterComponent extends AbstractFilterDirective {
    public filter: InputSignal<SingleSelectFilter<unknown>> =
        model.required<SingleSelectFilter<unknown>>();

    protected firstToggle: boolean = true;
    protected showingContent: boolean = false;
    protected selectedOption?: SelectOption<unknown> = undefined;

    // public optionSelected: OutputEmitterRef<SelectOption<unknown>> =
    //     output<SelectOption<unknown>>();
    public onInput: OutputEmitterRef<any> = output<any>(); //For search bar

    @HostListener('document:click', ['$event'])
    clickOutside(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.showingContent = false;
        }
    }

    constructor(private elementRef: ElementRef) {
        super();
    }

    protected toggleConent(): void {
        if (this.firstToggle) {
            this.firstToggle = false;
        }

        this.showingContent = !this.showingContent;
    }

    protected apply(option: SelectOption<unknown>): void {
        console.log('Apply in select-filter.component');
        // When we select an option the filter should become active
        // We should also add a clear icon button
        this.selectedOption = option;
        this.filter().selectOption(option.value);
        // this.optionSelected.emit(option);
        this.onApply.emit();
        this.toggleConent();
    }

    protected reset(): void {
        // When we reset the filter should become inactive
        // We should also remove the clear icon button
        this.filter().reset();

        this.selectedOption = undefined;
        this.toggleConent();
        this.onReset.emit();
    }

    protected input(event: any): void {
        this.onInput.emit(event);
    }
}
