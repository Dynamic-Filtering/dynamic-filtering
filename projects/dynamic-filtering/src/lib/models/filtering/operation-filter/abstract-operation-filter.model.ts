import { Filter } from "../filter.model";
import { Condition } from "../condition.model";
import { ComparisonOperation } from "../operations/comparison-operation.model";
import { EqualOperation } from "../operations/equal-operation.model";
import { LikeOperation } from "../operations/like-operation.model";

/**
 * Abstract class representing a filter that supports operations such as comparison, equality, or "like" operations.
 * This class allows only one condition per filter.
 *
 * @template T - The data type that the filter operates on (e.g., string, number, Date).
 * @template T - The data type that the options operate on.
 * @template R - The type of operation that this filter supports, such as comparison, equality, or "like" operations.
 *
 * @extends Filter<T, R>
 */
export abstract class AbstractOperationFilter<T, R extends ComparisonOperation | EqualOperation | LikeOperation> extends Filter<T, R> {
    /**
     * Initializes the operation filter with the provided column, label, and conditions.
     *
     * @param column - The column or field name that the filter applies to.
     * @param label - The label or display name for the filter.
     * @param conditions - An optional array of conditions to initialize the filter with.
     *                     This array must contain at most one condition.
     *
     * @throws RangeError - Throws an error if more than one condition is provided since this filter supports only a single condition.
     */
    constructor(column: string, label: string, conditions?: Condition<T, R>[]) {
        if (conditions && conditions.length > 1) {
            throw new RangeError("Operation filters only support a single condition");
        }

        super(column, label, conditions);
    }

    /**
     * Applies a new condition to the filter.
     *
     * This method sets a new condition using the provided value and operation and overwrites any existing conditions.
     * It also emits an event signaling that the filter has been applied.
     *
     * @param value - The value to be used for filtering.
     * @param operation - The operation to be applied (e.g., comparison, equality, "like" match).
     */
    public apply(value: T, operation: R): void {
        const condition = new Condition<T, R>(this.column, operation, value);
        this._conditions = [condition];
        this.onApply.emit();
    }
}
