import { Condition } from '../condition.model';
import { EqualOperation } from '../operations/equal-operation.model';
import { SelectOption } from '../options/select-option.model';
import { AbstractSelectFilter } from './abstract-select-filter.model';

/**
 * Represents a single-select filter that allows the user to select only one option at a time.
 * This filter operates based on an equality operation and only supports a single condition.
 *
 * @template T - The data type of the selectable options.
 *
 * @extends AbstractSelectFilter<T, SelectOption<T>>
 */
export class SingleSelectFilter<T> extends AbstractSelectFilter<
    T,
    EqualOperation.Equal,
    SelectOption<T>
> {
    /**
     * Creates an instance of `SingleSelectFilter`.
     *
     * @param column - The column or field name that the filter applies to.
     * @param label - The label or display name for the filter.
     * @param options - An array of selectable options for the filter.
     * @param conditions - An optional array of conditions.
     *                     This array must contain at most one condition; otherwise, a `RangeError` is thrown.
     *
     * @throws RangeError - Throws an error if more than one condition is provided, as the filter only supports a single condition.
     */
    constructor(
        column: string,
        label: string,
        options: SelectOption<T>[],
        conditions?: Condition<T, EqualOperation.Equal>[]
    ) {
        if (conditions && conditions.length > 1) {
            throw new RangeError(
                'Single select filters only support a single condition'
            );
        }

        super(column, label, options);
    }

    /**
     * Selects an option from the available options in the filter.
     *
     * This method finds the matching option by its value and creates a condition using the equality operation.
     * Once the option is selected, the filter's condition is updated, and the filter is applied.
     *
     * @param value - The value of the option to select.
     */
    public selectOption(value: T): void {
        const option = this.options.find(
            (option: SelectOption<T>) => option.value === value
        );
        if (option) {
            const condition = new Condition<T, EqualOperation.Equal>(
                this.column,
                EqualOperation.Equal,
                option.value
            );
            this._conditions = [condition];
            this.apply();
        }
    }
}
