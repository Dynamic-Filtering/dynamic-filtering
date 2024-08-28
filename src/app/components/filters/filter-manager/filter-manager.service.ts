import {
    computed,
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
            if (filter.Conditions.length === 0) {
                return false;
            }

            return filter.Conditions.every(
                (condition: Condition<unknown>) =>
                    condition.value !== undefined,
            );
        }),
    );

    public activeConditions: Signal<Condition<unknown>[]> = computed(() =>
        this.activeFilters().flatMap(
            (filter: Filter<unknown>) => filter.Conditions,
        ),
    );

    public setFilters(filters: Filter<unknown>[]): void {
        this.internalFilters.set([...filters]);
    }
}
