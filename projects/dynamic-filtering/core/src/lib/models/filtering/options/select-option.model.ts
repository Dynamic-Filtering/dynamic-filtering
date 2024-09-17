/**
 * Represents an option in a select input component, typically used in single-select filters.
 *
 * @template T - The type of the value associated with the option (e.g., string, number).
 */
export class SelectOption<T> {
    /**
     * The display label of the option.
     */
    label: string;

    /**
     * The value associated with the option.
     */
    value: T;

    /**
     * Creates an instance of `SelectOption`.
     *
     * @param label - The display label for the option, typically shown to the user.
     * @param value - The value associated with the option, typically used in the application's logic.
     */
    constructor(label: string, value: T) {
        this.label = label;
        this.value = value;
    }
}
