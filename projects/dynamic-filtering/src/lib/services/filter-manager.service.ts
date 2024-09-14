import { computed, Signal, signal, WritableSignal } from '@angular/core';
import { ComparisonOperation } from '../models/filtering/operations/comparison-operation.model';
import { EqualOperation } from '../models/filtering/operations/equal-operation.model';
import { LikeOperation } from '../models/filtering/operations/like-operation.model';
import { Filter } from '../models/filtering/filter.model';
import { Condition } from '../models/filtering/condition.model';

/**
 * Service to manage and interact with a collection of filters.
 *
 * The `FilterManagerService` provides functionality to set, add, remove, and notify
 * changes to a collection of filters. It also exposes computed signals for active
 * filters and their conditions based on specific criteria.
 */
export class FilterManagerService {
    /**
     * Internal writable signal that holds the current array of filters.
     * This is the mutable source of the `filters` signal.
     *
     * @private
     */
    private internalFilters: WritableSignal<
        Filter<unknown, ComparisonOperation | EqualOperation | LikeOperation>[]
    > = signal([]);

    /**
     * Read-only signal exposing the current filters.
     *
     * Provides external access to the internal array of filters, ensuring that
     * it cannot be modified directly.
     *
     * @public
     */
    public filters: Signal<
        Filter<unknown, ComparisonOperation | EqualOperation | LikeOperation>[]
    > = this.internalFilters.asReadonly();

    /**
     * Computed signal that returns the active filters.
     *
     * A filter is considered active if it contains one or more conditions,
     * and all conditions have a defined value.
     *
     * @public
     */
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
                // Filters are active if they have conditions with defined values
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

    /**
     * Computed signal that returns the active conditions.
     *
     * This signal flattens all conditions from active filters into a single array.
     *
     * @public
     */
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

    /**
     * Replaces the current array of filters.
     *
     * Sets a new array of filters and updates the internal state. This method
     * will notify any subscribers or dependent components that the filters
     * have changed.
     *
     * @param filters - The new array of filters to set.
     * @public
     */
    public setFilters(
        filters: Filter<
            unknown,
            ComparisonOperation | EqualOperation | LikeOperation
        >[]
    ): void {
        this.internalFilters.set([...filters]);
    }

    /**
     * Adds a new filter to the collection of filters.
     *
     * The new filter appendeds to the existing array of filters. This method
     * will notify any subscribers or dependent components that the filters
     * have changed.
     *
     * @param filter - The new filter to add.
     * @public
     */
    public addFilter(
        filter: Filter<
            unknown,
            ComparisonOperation | EqualOperation | LikeOperation
        >
    ): void {
        this.internalFilters.set([...this.internalFilters(), filter]);
    }

    /**
     * Removes a filter from the collection of filters by its index.
     *
     * This method will remove the filter at the specified index. This method
     * will notify any subscribers or dependent components that the filters
     * have changed.
     *
     * @param index - The index of the filter to remove.
     * @public
     */
    public removeFilter(index: number): void {
        this.internalFilters().splice(index, 1);
        this.notify();
    }

    /**
     * Resets all filters by calling their `reset` method.
     *
     * This will reset each filter in the array to its initial state.
     * Once reset, it will notify any subscribers of the changes.
     *
     * @public
     */
    public resetFilters(): void {
        this.internalFilters().forEach((filter) => filter.reset());
        this.notify();
    }

    /**
     * Notifies subscribers of changes in the filter array.
     *
     * This method is used to trigger an update in the filter state without
     * directly modifying the array. It effectively re-broadcasts the current
     * state of the filters, which can be useful for scenarios where the filters
     * themselves haven't changed, but subscribers need to be notified.
     *
     * @public
     */
    public notify(): void {
        this.internalFilters.update((value) => [...value]);
    }
}
