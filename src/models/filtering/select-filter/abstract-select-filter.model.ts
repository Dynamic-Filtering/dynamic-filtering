import { Filter } from '../filter.model';
import { EqualOperation } from '../operations/equal-operation.model';
import { MultiSelectOption } from '../options/multi-select-option.model';
import { SelectOption } from '../options/select-option.model';

export abstract class AbstractSelectFilter<
    T,
    R extends SelectOption<T> | MultiSelectOption<T>,
> extends Filter<T, EqualOperation.Equal> {
    // Might need options for replacing the list of options with a new one or adding and remove items
    protected _options: R[] = [];
    get options() {
        return this._options;
    }

    constructor(column: string, label: string, options: R[]) {
        super(column, label);
        this._options = options;
    }

    public abstract selectOption(value: T): void;

    public apply(): void {
        this.onApply.emit();
    }

    public reset() {
        this._conditions.length = 0;
        this.onReset.emit();
    }
}
