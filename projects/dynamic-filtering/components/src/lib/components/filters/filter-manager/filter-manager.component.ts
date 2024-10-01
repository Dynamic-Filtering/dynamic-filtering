import { CommonModule } from "@angular/common";
import {
    Component,
    effect,
    input,
    InputSignal,
    output,
    OutputEmitterRef,
    Signal,
} from "@angular/core";
import { FilterComponent } from "../filter/filter.component";
import {
    Filter,
    FilterManagerService,
    Operation,
} from "@dynamic-filtering/core";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-filter-manager",
    standalone: true,
    imports: [CommonModule, FilterComponent],
    templateUrl: "./filter-manager.component.html",
})
export class FilterManagerComponent {
    public filters: InputSignal<Filter<unknown, Operation>[]> =
        input.required();
    public componentMap: InputSignal<Map<unknown, unknown>> = input.required();

    public change: OutputEmitterRef<Filter<unknown, Operation>[]> =
        output<Filter<unknown, Operation>[]>();

    protected managerFilters: Signal<Filter<unknown, Operation>[]>;

    constructor(protected readonly filterManagerService: FilterManagerService) {
        effect(
            () => {
                if (this.filters()) {
                    this.filterManagerService.setFilters(this.filters());
                }
            },
            { allowSignalWrites: true },
        );

        this.managerFilters = toSignal(this.filterManagerService.filters$, {
            initialValue: [],
        });
    }
}
