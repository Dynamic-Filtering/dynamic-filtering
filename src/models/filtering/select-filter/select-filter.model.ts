import { Filter } from '../filter.model';
import { Condition } from '../../condition.model';
import { SelectOption } from './select-option.model';
import { EqualOperation } from '../operations/equal-operation.model';

export class SelectFilter<T> extends Filter<T> {
    private _options: SelectOption<T>[] = [];
    get options() {
        return this._options;
    }

    constructor(column: string, label: string, options: SelectOption<T>[]) {
        const selectCondition: Condition<T> = new Condition<T>(
            column,
            EqualOperation.Equal,
        );
        const conditions = [selectCondition];

        super(column, label, conditions);
        this._options = options;
    }

    public selectValue(id: number) {
        const option = this._options.find(
            (option: SelectOption<T>) => option.id === id,
        );
        if (option) {
            this._conditions[0].value = option.value;
            this.onApply.emit();
        }
    }

    public resetValue() {
        this._conditions[0].value = undefined;
        this.onReset.emit();
    }

    // Might need options for replacing the list with a new one or adding and remove items
}
