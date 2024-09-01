import { Filter } from '../filter.model';
import { Condition } from '../../condition.model';
import { SelectOption } from './select-option.model';
import { EqualOperation } from '../operations/equal-operation.model';

export class SelectFilter<T> extends Filter<T, EqualOperation.Equal> {
    private _options: SelectOption<T>[] = [];
    get options() {
        return this._options;
    }

    constructor(column: string, label: string, options: SelectOption<T>[]) {
        super(column, label);
        this._options = options;
    }

    public selectValue(id: number) {
        const option = this._options.find(
            (option: SelectOption<T>) => option.id === id,
        );
        if (option) {
            const condition = new Condition<T, EqualOperation.Equal>(
                this.column,
                EqualOperation.Equal,
                option.value,
            );
            this._conditions = [condition];
            this.onApply.emit();
        }
    }

    public resetValue() {
        this._conditions.length = 0;
        this.onReset.emit();
    }

    // Might need options for replacing the list with a new one or adding and remove items
}
