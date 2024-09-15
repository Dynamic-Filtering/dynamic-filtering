import { Condition } from "../condition.model";
import { ComparisonOperation } from "../operations/comparison-operation.model";
import { AbstractRangeFilter } from "./abstract-range-filter.model";

/**
 * A filter class for managing numeric range filtering.
 *
 * This class extends the `AbstractRangeFilter` to handle ranges of `number` values, enabling comparison operations
 * such as greater than and less than for filtering numeric ranges.
 *
 * @extends AbstractRangeFilter<number>
 */
export class NumberRangeFilter extends AbstractRangeFilter<number> {
    /**
     * Creates an instance of `NumberRangeFilter`.
     *
     * @param column - The name of the column or field that the filter applies to.
     * @param label - The label or display name of the filter.
     * @param conditions - An optional array of conditions to initialize the filter with, containing up to two conditions for range filtering.
     *
     * @remarks
     * - The filter can only have one or two conditions at a time. If more than two conditions are provided, a `RangeError` will be thrown by the parent class.
     * - This filter is designed to handle numeric comparisons and can be used for filtering by numeric ranges (e.g., age, prices).
     */
    constructor(
        column: string,
        label: string,
        conditions?: Condition<number, ComparisonOperation>[],
    ) {
        super(column, label, conditions);
    }
}
