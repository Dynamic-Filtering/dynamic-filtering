import { SelectOption } from "./select-option.model";

/**
 * Represents an option in a multi-select filter, extending the basic select option with a selection state.
 *
 * @template T - The type of the value associated with the option (e.g., string, number).
 * @extends SelectOption<T>
 */
export class MultiSelectOption<T> extends SelectOption<T> {
    /**
     * Indicates whether the option is selected.
     * Defaults to `false` if not specified.
     */
    selected: boolean = false;

    /**
     * Creates an instance of `MultiSelectOption`.
     *
     * @param label - The display label for the option, typically shown to the user.
     * @param value - The value associated with the option, typically used in the application's logic.
     * @param selected - Optional boolean indicating whether the option is initially selected. Defaults to `false`.
     */
    constructor(label: string, value: T, selected?: boolean) {
        super(label, value);

        if (selected !== undefined) {
            this.selected = selected;
        }
    }
}
