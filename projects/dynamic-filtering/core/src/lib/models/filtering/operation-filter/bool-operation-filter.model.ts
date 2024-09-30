import { EqualOperation } from "../operations/equal-operation.model";
import { AbstractOperationFilter } from "./abstract-operation-filter.model";
import { Condition } from "../condition.model";

/**
 * A filter class for handling boolean-based operations, such as equality operations.
 *
 * @extends AbstractOperationFilter<boolean, EqualOperation>
 */
export class BoolOperationFilter extends AbstractOperationFilter<
    boolean,
    EqualOperation
> {
    /**
     * Creates an instance of `BoolOperationFilter`.
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
        conditions?: Condition<boolean, EqualOperation>[],
    ) {
        super(column, label, conditions);
    }

    /**
     * Applies a condition to the filter using the provided string value and operation.
     *
     * This method overrides the base `apply` method of the `AbstractOperationFilter` class to apply
     * a string-based condition.
     *
     * @param value - The string value to compare or check for a match.
     * @param operation - The operation to be applied (either an equality or "like" operation).
     *
     * @remarks
     * The `apply` method updates the filter's conditions with the given value and operation, then emits
     * an event to indicate that the filter has been applied.
     */
    public override apply(value: boolean, operation: EqualOperation): void {
        super.apply(value, operation);
    }
}
