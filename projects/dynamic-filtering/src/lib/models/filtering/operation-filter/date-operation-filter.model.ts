import { EqualOperation } from "../operations/equal-operation.model";
import { ComparisonOperation } from "../operations/comparison-operation.model";
import { AbstractOperationFilter } from "./abstract-operation-filter.model";
import { Condition } from "../condition.model";

/**
 * A filter class for handling date-based operations, such as comparison or equality operations.
 *
 * @extends AbstractOperationFilter<Date, ComparisonOperation | EqualOperation>
 */
export class DateOperationFilter extends AbstractOperationFilter<
    Date,
    ComparisonOperation | EqualOperation
> {
    /**
     * Creates an instance of `DateOperationFilter`.
     *
     * @param column - The column or field name that the filter applies to.
     * @param label - The label or display name for the filter.
     * @param conditions - An optional array of conditions to initialize the filter with.
     *
     * @remarks
     * Only one condition is allowed for operation filters. If more than one condition is provided,
     * a `RangeError` will be thrown in the parent class constructor.
     */
    constructor(
        column: string,
        label: string,
        conditions?: Condition<Date, ComparisonOperation | EqualOperation>[],
    ) {
        super(column, label, conditions);
    }

    /**
     * Applies a condition to the filter using the provided date value and operation.
     *
     * This method overrides the base `apply` method of the `AbstractOperationFilter` class to apply
     * a date-based condition.
     *
     * @param value - The date value to compare or check for equality.
     * @param operation - The operation to be applied (either a comparison or equality operation).
     *
     * @remarks
     * The `apply` method updates the filter's conditions with the given value and operation, then emits
     * an event to indicate that the filter has been applied.
     */
    public override apply(
        value: Date,
        operation: ComparisonOperation | EqualOperation,
    ): void {
        super.apply(value, operation);
    }
}
