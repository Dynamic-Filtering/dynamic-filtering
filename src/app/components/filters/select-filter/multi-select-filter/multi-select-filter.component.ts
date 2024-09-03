import { CommonModule } from '@angular/common';
import {
    Component,
    ElementRef,
    HostListener,
    InputSignal,
    model,
    output,
    OutputEmitterRef,
} from '@angular/core';
import { ButtonComponent } from '../../../button/button.component';
import { AbstractFilterDirective } from '../../filter/abstract-filter.directive';
import { MultiSelectFilter } from '../../../../../models/filtering/select-filter/multi-select-filter.model';
import { MultiSelectOption } from '../../../../../models/filtering/select-filter/multi-select-option.model';

@Component({
    selector: 'app-select-filter',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './multi-select-filter.component.html',
    styleUrls: ['./multi-select-filter.component.scss'],
})
export class MultiSelectFilterComponent extends AbstractFilterDirective {
    public filter: InputSignal<MultiSelectFilter<unknown>> =
        model.required<MultiSelectFilter<unknown>>();

    protected firstToggle: boolean = true;
    protected showingContent: boolean = false;
    protected selectedOptions: MultiSelectOption<unknown>[] = [];

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

    protected apply(option: MultiSelectOption<unknown>): void {
        this.filter().selectOption(option.value);
        this.selectedOptions.push(option);

        // this.onApply.emit();
        // this.toggleConent();
    }

    protected reset(): void {
        // When we reset the filter should become inactive
        // We should also remove the clear icon button
        this.filter().reset();

        this.selectedOptions = [];
        this.toggleConent();
        this.onReset.emit();
    }

    protected input(event: any): void {
        this.onInput.emit(event);
    }
}
