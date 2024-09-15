/**
 * A class representing a condition used for filtering.
 *
 * The `Condition` class defines a filter condition that consists of a column (field), an operation, and a value.
 * This condition is used in conjunction with filters to apply specific filtering logic on a dataset.
 *
 * @template T - The type of the value that the condition operates on (e.g., string, number, Date).
 * @template R - The type of the operation used to compare or evaluate the value (e.g., equal, comparison).
 */
export class Condition<T, R> {
    /**
     * The column or field to which the condition applies.
     */
    column: string;

    /**
     * The operation to be performed on the value (e.g., equal, greater than, like).
     */
    operation: R;

    /**
     * The value to be compared or evaluated using the operation.
     */
    value: T;

    /**
     * Creates an instance of `Condition`.
     *
     * @param column - The column or field that the condition applies to.
     * @param operation - The operation to be performed (e.g., comparison or equality check).
     * @param value - The value to be used in the condition, which will be compared using the operation.
     */
    constructor(column: string, operation: R, value: T) {
        this.column = column;
        this.operation = operation;
        this.value = value;
    }
}
