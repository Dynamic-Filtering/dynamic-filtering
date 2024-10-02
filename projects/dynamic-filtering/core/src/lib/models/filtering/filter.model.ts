import { EventEmitter } from "@angular/core";
import { Condition } from "./condition.model";
import { Operation } from "./operations/operation.model";

/**
 * An abstract base class representing a filter for managing conditions that apply to data filtering logic.
 *
 * This class provides common functionality for filters, such as storing conditions, emitting events when
 * filters are applied or reset, and managing filter-specific metadata like column and label.
 *
 * @template T - The type of value that the filter operates on (e.g., string, number, Date).
 * @template R - The type of operations the filter supports (e.g., comparison, equality, or like operations).
 */
export abstract class Filter<T, R extends Operation> {
    /**
     * The name of the column or field that this filter applies to.
     */
    public readonly column: string;

    /**
     * The label or display name of this filter.
     */
    public readonly label: string;

    /**
     * The internal list of conditions applied to this filter.
     * These conditions define how the filter operates on the dataset.
     */
    protected _conditions: Condition<T, R>[];

    /**
     * Gets the list of conditions associated with this filter.
     *
     * @returns An array of `Condition` instances that represent the current filter conditions.
     */
    get conditions(): Condition<T, R>[] {
        return this._conditions;
    }

    /**
     * Event emitter that is triggered when the filter is reset.
     */
    private _onReset: EventEmitter<void> = new EventEmitter();

    /**
     * Gets the event emitter for when the filter is reset.
     *
     * @returns An `EventEmitter` that emits a `void` event when the filter is reset.
     */
    get onReset(): EventEmitter<void> {
        return this._onReset;
    }

    /**
     * Event emitter that is triggered when the filter is applied.
     */
    private _onApply: EventEmitter<void> = new EventEmitter();

    /**
     * Gets the event emitter for when the filter is applied.
     *
     * @returns An `EventEmitter` that emits a `void` event when the filter is applied.
     */
    get onApply(): EventEmitter<void> {
        return this._onApply;
    }

    /**
     * Creates an instance of a filter.
     *
     * @param column - The name of the column or field that this filter applies to.
     * @param label - The label or display name for the filter.
     * @param conditions - An optional initial set of conditions for the filter.
     */
    constructor(
        column: string,
        label: string,
        conditions: Condition<T, R>[] = [],
    ) {
        this.column = column;
        this.label = label;
        this._conditions = conditions;
    }

    /**
     * Resets the filter by clearing all its conditions.
     *
     * @remarks
     * This method will emit the `onReset` event to notify that the filter has been reset.
     */
    public reset(): void {
        this._conditions.length = 0;
        this.onReset.emit();
    }
}
