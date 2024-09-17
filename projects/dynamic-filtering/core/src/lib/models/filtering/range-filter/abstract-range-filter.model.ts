import { Filter } from "../filter.model";
import { Condition } from "../condition.model";
import { ComparisonOperation } from "../operations/comparison-operation.model";

/**
 * An abstract base class for filters that apply range operations, typically for numeric or date values.
 *
 * This filter allows setting one or two conditions to represent a range of values. It supports comparison
 * operations like greater than, less than, and equal to.
 *
 * @typeParam T - The type of the values being filtered, which must be either `number` or `Date`.
 * @extends Filter<T, ComparisonOperation>
 */
export abstract class AbstractRangeFilter<T> extends Filter<
    T,
    ComparisonOperation
> {
    /**
     * Creates an instance of `AbstractRangeFilter`.
     *
     * @param column - The name of the column or field that the filter applies to.
     * @param label - The label or display name of the filter.
     * @param conditions - An optional array of conditions to initialize the filter with. This array can contain one or two conditions.
     *
     * @throws RangeError - If more than two conditions are provided, a `RangeError` is thrown because range filters only support up to two conditions.
     */
    constructor(
        column: string,
        label: string,
        conditions?: Condition<T, ComparisonOperation>[],
    ) {
        if (conditions && conditions.length > 2) {
            throw new RangeError(
                "Range filters only support 1 or 2 conditions",
            );
        }

        super(column, label, conditions);
    }

    /**
     * Applies a range of conditions to the filter by specifying two values and their respective comparison operations.
     *
     * This method creates two conditions, representing the lower and upper bounds of the range, and applies them to the filter.
     *
     * @param value1 - The first value in the range, representing the lower or upper bound.
     * @param operation1 - The comparison operation to apply to `value1` (e.g., greater than, less than, equal to).
     * @param value2 - The second value in the range, representing the opposite bound (upper or lower bound).
     * @param operation2 - The comparison operation to apply to `value2` (e.g., greater than, less than, equal to).
     *
     * @remarks
     * - This method replaces any previously set conditions with the new range conditions.
     * - The filter allows specifying exactly two conditions for a range filter, typically representing both the upper and lower bounds of the range.
     */
    public apply(
        value1: T,
        operation1: ComparisonOperation,
        value2: T,
        operation2: ComparisonOperation,
    ) {
        const condition1 = new Condition<T, ComparisonOperation>(
            this.column,
            operation1,
            value1,
        );
        const condition2 = new Condition<T, ComparisonOperation>(
            this.column,
            operation2,
            value2,
        );

        this._conditions = [condition1, condition2];
        this.onApply.emit();
    }
}
