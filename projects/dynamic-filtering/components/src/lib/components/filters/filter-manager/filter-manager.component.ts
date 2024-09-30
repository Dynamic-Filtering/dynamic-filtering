import { CommonModule } from "@angular/common";
import {
    Component,
    effect,
    input,
    InputSignal,
    output,
    OutputEmitterRef,
} from "@angular/core";
import { FilterComponent } from "../filter/filter.component";
import {
    ComparisonOperation,
    EqualOperation,
    Filter,
    FilterManagerService,
    InOperation,
    LikeOperation,
} from "@dynamic-filtering/core";

@Component({
    selector: "app-filter-manager",
    standalone: true,
    imports: [CommonModule, FilterComponent],
    templateUrl: "./filter-manager.component.html",
})
export class FilterManagerComponent {
    public filters: InputSignal<
        Filter<
            unknown,
            ComparisonOperation | EqualOperation | LikeOperation | InOperation
        >[]
    > = input.required();
    public componentMap: InputSignal<Map<unknown, unknown>> = input.required();

    public change: OutputEmitterRef<
        Filter<
            unknown,
            ComparisonOperation | EqualOperation | LikeOperation | InOperation
        >[]
    > =
        output<
            Filter<
                unknown,
                | ComparisonOperation
                | EqualOperation
                | LikeOperation
                | InOperation
            >[]
        >();

    constructor(protected readonly filterManagerService: FilterManagerService) {
        effect(
            () => {
                if (this.filters()) {
                    this.filterManagerService.setFilters(this.filters());
                }
            },
            { allowSignalWrites: true },
        );
    }
}
