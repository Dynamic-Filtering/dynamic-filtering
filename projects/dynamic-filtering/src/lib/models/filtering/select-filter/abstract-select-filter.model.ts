import { Condition } from '../condition.model';
import { Filter } from '../filter.model';
import { EqualOperation } from '../operations/equal-operation.model';
import { MultiSelectOption } from '../options/multi-select-option.model';
import { SelectOption } from '../options/select-option.model';

/**
 * Abstract class for implementing a select filter that operates with options such as single or multi-select.
 * This filter allows selecting from predefined options and applies an equality operation.
 *
 * @template T - The data type that the options operate on.
 * @template R - The type of option used by the filter, which can either be a single select option or a multi-select option.
 *
 * @extends Filter<T, EqualOperation.Equal>
 */
export abstract class AbstractSelectFilter<
    T,
    R extends SelectOption<T> | MultiSelectOption<T>
> extends Filter<T, EqualOperation.Equal> {
    /**
     * A protected array of options that can be selected in this filter.
     * This array represents the list of selectable options.
     *
     * @protected
     */
    protected _options: R[] = [];

    /**
     * Getter for retrieving the available options for this filter.
     *
     * @returns {R[]} The list of options that can be selected.
     */
    get options(): R[] {
        return this._options;
    }

    /**
     * Initializes the select filter with the provided column, label, and list of options.
     *
     * This constructor is intended to be called by subclasses when setting up a select filter.
     *
     * @param column - The column or field name that the filter applies to.
     * @param label - The label or display name for the filter.
     * @param options - The list of options that can be selected from in the filter.
     * @param conditions - An optional array of conditions to initialize the filter with.
     *
     * @protected
     */
    constructor(
        column: string,
        label: string,
        options: R[],
        conditions?: Condition<T, EqualOperation.Equal>[]
    ) {
        super(column, label, conditions);
        this._options = options;
    }

    /**
     * Abstract method for selecting an option within the filter.
     *
     * Subclasses must implement this method to define how an option is selected.
     *
     * @param value - The value to be selected.
     */
    public abstract selectOption(value: T): void;

    /**
     * Applies the filter and emits the filter's `onApply` event.
     *
     * This method signals that the filter has been applied. It does not modify any conditions,
     * but it should be called after selecting or modifying options.
     */
    public apply(): void {
        this.onApply.emit();
    }
}
