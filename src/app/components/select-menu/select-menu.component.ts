import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, input, InputSignal, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SelectOption } from "dynamic-filtering";

@Component({
    selector: "app-select-menu",
    standalone: true,
    imports: [CommonModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectMenuComponent),
            multi: true,
        },
    ],
    templateUrl: "./select-menu.component.html",
    styleUrl: "./select-menu.component.scss",
})
export class SelectMenuComponent implements ControlValueAccessor {
    //This is more of a combobox than a select
    public label: InputSignal<string | undefined> = input();
    public placeholder: InputSignal<string | undefined> = input();
    public options: InputSignal<SelectOption<any>[]> = input.required();
    // public value: InputSignal<string | undefined> = input();

    public value: string | undefined = undefined;

    @Output() optionSelected: EventEmitter<SelectOption<any>> = new EventEmitter();

    protected showingContent: boolean = false;
    protected selectedOption: SelectOption<any> | undefined = undefined;

    onChange: any = () => {};
    onTouched: any = () => {};

    @HostListener("document:click", ["$event"])
    clickOutside(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.showingContent = false;
        }
    }

    constructor(protected elementRef: ElementRef) {}

    writeValue(value: any): void {
        if (value) {
            this.value = value;
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // throw new Error('Method not implemented.');
    }

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
        this.value = option.value;
        this.toggleContent();
    }

    protected clear(): void {}
}
