import { computed, Signal, signal, WritableSignal } from '@angular/core';
import { ComparisonOperation } from '../models/filtering/operations/comparison-operation.model';
import { EqualOperation } from '../models/filtering/operations/equal-operation.model';
import { LikeOperation } from '../models/filtering/operations/like-operation.model';
import { Filter } from '../models/filtering/filter.model';
import { Condition } from '../models/filtering/condition.model';

export class FilterManagerService {
    private internalFilters: WritableSignal<
        Filter<unknown, ComparisonOperation | EqualOperation | LikeOperation>[]
    > = signal([]);
    public filters: Signal<
        Filter<unknown, ComparisonOperation | EqualOperation | LikeOperation>[]
    > = this.internalFilters.asReadonly();

    public activeFilters: Signal<
        Filter<unknown, ComparisonOperation | EqualOperation | LikeOperation>[]
    > = computed(() =>
        this.internalFilters().filter(
            (
                filter: Filter<
                    unknown,
                    ComparisonOperation | EqualOperation | LikeOperation
                >
            ) => {
                if (filter.conditions.length === 0) {
                    return false;
                }

                return filter.conditions.every(
                    (
                        condition: Condition<
                            unknown,
                            ComparisonOperation | EqualOperation | LikeOperation
                        >
                    ) => condition.value !== undefined
                );
            }
        )
    );

    public activeConditions: Signal<
        Condition<
            unknown,
            ComparisonOperation | EqualOperation | LikeOperation
        >[]
    > = computed(() =>
        this.activeFilters().flatMap(
            (
                filter: Filter<
                    unknown,
                    ComparisonOperation | EqualOperation | LikeOperation
                >
            ) => filter.conditions
        )
    );

    public setFilters(
        filters: Filter<
            unknown,
            ComparisonOperation | EqualOperation | LikeOperation
        >[]
    ): void {
        this.internalFilters.set([...filters]);
    }

    public notify(): void {
        this.internalFilters.update((value) => [...value]);
    }
}
