import {
    computed,
    effect,
    Injectable,
    Signal,
    signal,
    WritableSignal,
} from '@angular/core';
import { Filter } from '../../../../models/filtering/filter.model';
import { Condition } from '../../../../models/condition.model';

export class FilterManagerService {
    private internalFilters: WritableSignal<Filter<unknown>[]> = signal([]);
    public filters: Signal<Filter<unknown>[]> =
        this.internalFilters.asReadonly();

    public activeFilters: Signal<Filter<unknown>[]> = computed(() =>
        this.internalFilters().filter((filter: Filter<unknown>) => {
            if (filter.conditions.length === 0) {
                return false;
            }

            return filter.conditions.every(
                (condition: Condition<unknown>) =>
                    condition.value !== undefined,
            );
        }),
    );

    public activeConditions: Signal<Condition<unknown>[]> = computed(() =>
        this.activeFilters().flatMap(
            (filter: Filter<unknown>) => filter.conditions,
        ),
    );

    public setFilters(filters: Filter<unknown>[]): void {
        this.internalFilters.set([...filters]);
    }
}
