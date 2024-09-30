import { CommonModule } from "@angular/common";
import {
    AfterViewInit,
    Component,
    input,
    InputSignal,
    output,
    OutputEmitterRef,
    ViewChild,
    ViewContainerRef,
} from "@angular/core";
import {
    ComparisonOperation,
    EqualOperation,
    Filter,
    InOperation,
    LikeOperation,
} from "@dynamic-filtering/core";

@Component({
    selector: "app-filter",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./filter.component.html",
})
export class FilterComponent implements AfterViewInit {
    // Input
    public filter: InputSignal<
        Filter<
            unknown,
            ComparisonOperation | EqualOperation | LikeOperation | InOperation
        >
    > =
        input.required<
            Filter<
                unknown,
                | ComparisonOperation
                | EqualOperation
                | LikeOperation
                | InOperation
            >
        >();

    public componentMap: InputSignal<Map<any, any>> = input.required();

    @ViewChild("filterContainer", { read: ViewContainerRef })
    private filterContainer!: ViewContainerRef;

    public onReset: OutputEmitterRef<void> = output<void>();
    public onApply: OutputEmitterRef<void> = output<void>();

    private eventMap = new Map<string, Function>([
        ["onReset", () => this.reset()],
        ["onApply", () => this.apply()],
    ]);

    public ngAfterViewInit() {
        this.loadComponent();
    }

    private loadComponent() {
        for (const componentMapping of this.componentMap().entries()) {
            const filterType: any = componentMapping[0];

            if (this.filter() instanceof filterType) {
                const componentRef = this.filterContainer.createComponent(
                    componentMapping[1],
                );
                const componentRefAsAny: any = componentRef.instance;
                componentRefAsAny.filter = this.filter;

                for (const eventMapping of this.eventMap.entries()) {
                    if (componentRefAsAny[eventMapping[0]]) {
                        componentRefAsAny[eventMapping[0]].subscribe(
                            (event: any) => {
                                eventMapping[1](event);
                            },
                        );
                    }
                }
            }
        }
    }

    protected reset(): void {
        this.onReset.emit();
    }

    protected apply(): void {
        this.onApply.emit();
    }
}
