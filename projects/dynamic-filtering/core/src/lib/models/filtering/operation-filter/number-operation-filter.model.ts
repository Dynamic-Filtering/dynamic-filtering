import { EqualOperation } from "../operations/equal-operation.model";
import { ComparisonOperation } from "../operations/comparison-operation.model";
import { AbstractOperationFilter } from "./abstract-operation-filter.model";
import { Condition } from "../condition.model";

/**
 * A filter class for handling number-based operations, such as comparison or equality operations.
 *
 * @extends AbstractOperationFilter<number, ComparisonOperation | EqualOperation>
 */
export class NumberOperationFilter extends AbstractOperationFilter<
    number,
    ComparisonOperation | EqualOperation
> {
    /**
     * Creates an instance of `NumberOperationFilter`.
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
        conditions?: Condition<number, ComparisonOperation | EqualOperation>[],
    ) {
        super(column, label, conditions);
    }

    /**
     * Applies a condition to the filter using the provided number value and operation.
     *
     * This method overrides the base `apply` method of the `AbstractOperationFilter` class to apply
     * a number-based condition.
     *
     * @param value - The number value to compare or check for equality.
     * @param operation - The operation to be applied (either a comparison or equality operation).
     *
     * @remarks
     * The `apply` method updates the filter's conditions with the given value and operation, then emits
     * an event to indicate that the filter has been applied.
     */
    public override apply(
        value: number,
        operation: ComparisonOperation | EqualOperation,
    ): void {
        super.apply(value, operation);
    }
}
