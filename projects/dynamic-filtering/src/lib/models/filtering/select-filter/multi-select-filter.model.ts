import { Condition } from '../condition.model';
import { EqualOperation } from '../operations/equal-operation.model';
import { MultiSelectOption } from '../options/multi-select-option.model';
import { AbstractSelectFilter } from './abstract-select-filter.model';

/**
 * Represents a multi-select filter that allows the user to select multiple options simultaneously.
 * This filter operates based on an equality operation and supports multiple conditions.
 *
 * @template T - The data type of the selectable options.
 *
 * @extends AbstractSelectFilter<T, MultiSelectOption<T>>
 */
export class MultiSelectFilter<T> extends AbstractSelectFilter<
    T,
    MultiSelectOption<T>
> {
    /**
     * Getter to retrieve the currently selected options.
     *
     * @returns {MultiSelectOption<T>[]} An array of selected options.
     */
    get selectedOptions(): MultiSelectOption<T>[] {
        return this._options.filter(
            (option: MultiSelectOption<T>) => option.selected
        );
    }

    /**
     * Creates an instance of `MultiSelectFilter`.
     *
     * @param column - The column or field name that the filter applies to.
     * @param label - The label or display name for the filter.
     * @param options - An array of selectable options for the filter.
     * @param conditions - An optional array of conditions to initialize the filter with.
     */
    constructor(
        column: string,
        label: string,
        options: MultiSelectOption<T>[],
        conditions?: Condition<T, EqualOperation.Equal>[]
    ) {
        super(column, label, options, conditions);
    }

    /**
     * Selects or deselects an option based on its current state.
     *
     * If the option is already selected, it will be deselected and removed from the filter's conditions.
     * If the option is not selected, it will be selected and added to the filter's conditions.
     *
     * @param value - The value of the option to select or deselect.
     */
    public selectOption(value: T): void {
        const option = this.options.find(
            (option: MultiSelectOption<T>) => option.value === value
        );
        if (option) {
            if (option.selected) {
                const conditionIndex = this._conditions.findIndex(
                    (condition: Condition<T, EqualOperation.Equal>) =>
                        condition.value === option.value
                );
                if (conditionIndex !== -1) {
                    this._conditions.splice(conditionIndex, 1);
                    option.selected = false;
                }
            } else {
                const condition: Condition<T, EqualOperation.Equal> =
                    new Condition<T, EqualOperation.Equal>(
                        this.column,
                        EqualOperation.Equal,
                        option.value
                    );
                this._conditions = [...this._conditions, condition];
                option.selected = true;
            }
        }
    }

    /**
     * Resets the filter by deselecting all options and clearing all conditions.
     *
     * This method deselects all currently selected options and then calls the parent class's `reset` method
     * to ensure that the filter is fully reset.
     */
    public override reset(): void {
        this._options = this._options.map((option: MultiSelectOption<T>) => {
            option.selected = false;
            return option;
        });

        super.reset();
    }
}
