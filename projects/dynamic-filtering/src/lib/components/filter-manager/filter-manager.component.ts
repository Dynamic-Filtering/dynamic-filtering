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
import { EqualOperation } from "../../models/filtering/operations/equal-operation.model";
import { LikeOperation } from "../../models/filtering/operations/like-operation.model";
import { ComparisonOperation } from "../../models/filtering/operations/comparison-operation.model";
import { Filter } from "../../models/filtering/filter.model";
import { FilterManagerService } from "../../services/filter-manager.service";
import { InOperation } from "../../models/filtering/operations/in-operation.model";

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

    protected filtersChanged() {
        this.change.emit(this.filterManagerService.filters());
        this.filterManagerService.notify();
    }
}
