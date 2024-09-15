import { Condition } from '../condition.model';
import { ComparisonOperation } from '../operations/comparison-operation.model';
import { AbstractRangeFilter } from './abstract-range-filter.model';

/**
 * A filter class for managing date range filtering.
 *
 * This class extends the `AbstractRangeFilter` to handle ranges of `Date` values, allowing comparison operations like
 * greater than and less than for filtering date ranges.
 *
 * @extends AbstractRangeFilter<Date>
 */
export class DateRangeFilter extends AbstractRangeFilter<Date> {
    /**
     * Creates an instance of `DateRangeFilter`.
     *
     * @param column - The name of the column or field that the filter applies to.
     * @param label - The label or display name of the filter.
     * @param conditions - An optional array of conditions to initialize the filter with, containing up to two conditions for range filtering.
     *
     * @remarks
     * - The filter can only have one or two conditions at a time. If more than two conditions are provided, a `RangeError` will be thrown by the parent class.
     * - This filter is designed to handle date comparisons and can be used for filtering by date ranges.
     */
    constructor(
        column: string,
        label: string,
        conditions?: Condition<Date, ComparisonOperation>[]
    ) {
        super(column, label, conditions);
    }
}
