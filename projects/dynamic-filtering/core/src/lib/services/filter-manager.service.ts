import {
    BehaviorSubject,
    Observable,
    Subject,
    Subscription,
    map,
    takeUntil,
} from "rxjs";
import { Filter } from "../models/filtering/filter.model";
import { Condition } from "../models/filtering/condition.model";
import { Operation } from "../models/filtering/operations/operation.model";

/**
 * Service to manage and interact with a collection of filters.
 *
 * This service provides reactive streams for filters, active filters,
 * and active conditions. It also provides methods to modify the filter collection
 * and manages subscriptions to individual filter events.
 */
export class FilterManagerService {
    private filtersSubject: BehaviorSubject<Filter<unknown, Operation>[]>;
    private filterSubscriptions: Subscription[] = [];
    private destroy$ = new Subject<void>();

    /**
     * Observable stream of all filters.
     */
    public filters$: Observable<Filter<unknown, Operation>[]>;

    /**
     * Observable stream of active filters.
     * A filter is considered active if it has at least one condition and all its conditions have defined values.
     */
    public activeFilters$: Observable<Filter<unknown, Operation>[]>;

    /**
     * Observable stream of all conditions from active filters.
     */
    public activeConditions$: Observable<Condition<unknown, Operation>[]>;

    constructor(filters: Filter<unknown, Operation>[] = []) {
        this.filtersSubject = new BehaviorSubject<Filter<unknown, Operation>[]>(
            filters,
        );
        this.filters$ = this.filtersSubject.asObservable();

        this.activeFilters$ = this.filters$.pipe(
            map((filters) => filters.filter(this.isActiveFilter)),
        );

        this.activeConditions$ = this.activeFilters$.pipe(
            map((filters) => filters.flatMap((filter) => filter.conditions)),
        );

        this.setupFilterListeners(filters);
    }

    /**
     * Sets the current array of filters, replacing any existing filters.
     *
     * @param filters - The new array of filters to set.
     */
    public setFilters(filters: Filter<unknown, Operation>[]): void {
        this.filtersSubject.next(filters);
        this.clearFilterSubscriptions();
        this.setupFilterListeners(filters);
    }

    /**
     * Adds a new filter to the collection of filters.
     *
     * @param filter - The new filter to add.
     */
    public addFilter(filter: Filter<unknown, Operation>): void {
        this.filtersSubject.next([...this.filtersSubject.value, filter]);
    }

    /**
     * Removes a filter from the collection of filters by its index.
     *
     * @param index - The index of the filter to remove.
     */
    public removeFilter(index: number): void {
        this.filtersSubject.value.splice(index, 1);
        this.notifyFilterChange();
    }

    /**
     * Resets all filters by calling their `reset` method.
     * This will trigger an update to all observables.
     */
    public resetFilters(): void {
        const filters = this.filtersSubject.value;
        filters.forEach((filter) => filter.reset());
    }

    /**
     * Disposes of the service by completing the destroy subject.
     * This method should be called when the service is no longer needed.
     */
    public dispose(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Determines if a filter is active.
     * A filter is considered active if it has at least one condition
     * and all its conditions have defined values.
     *
     * @param filter - The filter to check.
     * @returns True if the filter is active, false otherwise.
     */
    private isActiveFilter(filter: Filter<unknown, Operation>): boolean {
        return (
            filter.conditions.length > 0 &&
            filter.conditions.every(
                (condition) => condition.value !== undefined,
            )
        );
    }

    /**
     * Sets up listeners for the onReset and onApply events of each filter.
     * Uses the takeUntil pattern to automatically unsubscribe when the service is disposed.
     */
    private setupFilterListeners(filters: Filter<unknown, Operation>[]): void {
        filters.forEach((filter) => {
            const onResetSubscription = filter.onReset
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.notifyFilterChange());
            const onApplySubscription = filter.onApply
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.notifyFilterChange());

            this.filterSubscriptions = [
                ...this.filterSubscriptions,
                onResetSubscription,
                onApplySubscription,
            ];
        });
    }

    /**
     * Notifies subscribers of a change in the filters.
     * This method creates a new array reference.
     */
    private notifyFilterChange(): void {
        this.filtersSubject.next(this.filtersSubject.value);
    }

    /**
     * Unsubscribes from all existing filter subscriptions.
     */
    private clearFilterSubscriptions(): void {
        this.filterSubscriptions.forEach((sub) => sub.unsubscribe());
        this.filterSubscriptions.length = 0;
    }
}
