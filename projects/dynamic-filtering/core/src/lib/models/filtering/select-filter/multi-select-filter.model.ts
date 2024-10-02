import { Condition } from "../condition.model";
import { InOperation } from "../operations/in-operation.model";
import { MultiSelectOption } from "../options/multi-select-option.model";
import { AbstractSelectFilter } from "./abstract-select-filter.model";

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
    InOperation.In,
    MultiSelectOption<T>
> {
    /**
     * The internal list of selected options applied to this filter.
     * These selected options define how the filter operates on the dataset.
     */
    private _selectedOptions: MultiSelectOption<T>[] = [];

    /**
     * Getter to retrieve the currently selected options.
     *
     * @returns {MultiSelectOption<T>[]} An array of selected options.
     */
    get selectedOptions(): MultiSelectOption<T>[] {
        return this._selectedOptions;
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
        conditions?: Condition<T, InOperation.In>[],
    ) {
        super(column, label, options, conditions);
    }

    /**
     * Selects or deselects an option based on its current state.
     *
     * If the option is already selected, it will be deselected and removed from the selected options.
     * If the option is not selected, it will be selected and added to the filter's selected options.
     *
     * @param value - The value of the option to select or deselect.
     */
    public selectOption(value: T): void {
        const option = this.options.find(
            (option: MultiSelectOption<T>) => option.value === value,
        );
        if (option) {
            if (option.selected) {
                const selectedOptionIndex = this._selectedOptions.findIndex(
                    (selectedOption: MultiSelectOption<T>) =>
                        selectedOption.value === option.value,
                );
                if (selectedOptionIndex !== -1) {
                    this._selectedOptions.splice(selectedOptionIndex, 1);
                    option.selected = false;
                }
            } else {
                this._selectedOptions = [...this._selectedOptions, option];
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
        this._selectedOptions.length = 0;

        super.reset();
    }

    /**
     * Applies the filter by adding each selected option as a condition to the condition list.
     *
     * this methods calls the parent class's `apply` method to ensure the filter notifies it is applied.
     */
    public override apply(): void {
        this._conditions = this._selectedOptions.map(
            (selectedOption: MultiSelectOption<T>) =>
                new Condition<T, InOperation.In>(
                    this.column,
                    InOperation.In,
                    selectedOption.value,
                ),
        );

        super.apply();
    }
}
