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
import { SelectOption } from '../../../models/filtering/select-filter/select-option.model';

@Component({
    selector: 'app-select-menu',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './select-menu.component.html',
    styleUrl: './select-menu.component.scss',
})
export class SelectMenuComponent {
    //This is more of a combobox than a select
    public label: InputSignal<string | undefined> = input();
    public placeholder: InputSignal<string | undefined> = input();
    public options: InputSignal<SelectOption<any>[]> = input.required();

    @Output() optionSelected: EventEmitter<SelectOption<any>> =
        new EventEmitter();

    protected showingContent: boolean = false;
    protected selectedOption: SelectOption<any> | undefined = undefined;

    @HostListener('document:click', ['$event'])
    clickOutside(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.showingContent = false;
        }
    }

    constructor(protected elementRef: ElementRef) {}

    ngAfterContentInit(): void {
        if (this.placeholder() === undefined) {
            this.selectedOption = this.options()[0];
        }
    }

    protected toggleContent(): void {
        this.showingContent = !this.showingContent;
    }

    protected optionSelectedHandler(option: SelectOption<any>): void {
        this.selectedOption = option;
        this.optionSelected.emit(option);
        this.toggleContent();
    }
}
