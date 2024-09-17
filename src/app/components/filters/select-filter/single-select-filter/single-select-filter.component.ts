import { CommonModule } from "@angular/common";
import {
    Component,
    InputSignal,
    model,
    OutputEmitterRef,
    output,
    HostListener,
    ElementRef,
    AfterViewInit,
} from "@angular/core";
import {
    AbstractFilterDirective,
    SingleSelectFilter,
    SelectOption,
} from "@dynamic-filtering/core";
import { ButtonComponent } from "../../../button/button.component";

@Component({
    selector: "app-single-select-filter",
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: "./single-select-filter.component.html",
    styleUrls: ["./single-select-filter.component.scss"],
})
export class SingleSelectFilterComponent
    extends AbstractFilterDirective
    implements AfterViewInit
{
    public filter: InputSignal<SingleSelectFilter<unknown>> =
        model.required<SingleSelectFilter<unknown>>();

    protected firstToggle: boolean = true;
    protected showingContent: boolean = false;
    protected selectedOption?: SelectOption<unknown> = undefined;

    // public optionSelected: OutputEmitterRef<SelectOption<unknown>> =
    //     output<SelectOption<unknown>>();
    public onInput: OutputEmitterRef<any> = output<any>(); //For search bar

    @HostListener("document:click", ["$event"])
    clickOutside(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.showingContent = false;
        }
    }

    constructor(private elementRef: ElementRef) {
        super();
    }

    public ngAfterViewInit(): void {
        // The filter can be reset outside of the component,
        // therefore we should listen to this event
        this.filter().onReset.subscribe(() => {
            this.selectedOption = undefined;
        });
    }

    protected toggleConent(): void {
        if (this.firstToggle) {
            this.firstToggle = false;
        }

        this.showingContent = !this.showingContent;
    }

    protected apply(option: SelectOption<unknown>): void {
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

        // this.selectedOption = undefined;
        this.toggleConent();
        this.onReset.emit();
    }

    protected input(event: any): void {
        this.onInput.emit(event);
    }
}
