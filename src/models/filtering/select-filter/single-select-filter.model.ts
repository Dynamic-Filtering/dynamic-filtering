import { Condition } from '../../condition.model';
import { SelectOption } from './select-option.model';
import { EqualOperation } from '../operations/equal-operation.model';
import { AbstractSelectFilter } from './abstract-select-filter.model';

export class SingleSelectFilter<T> extends AbstractSelectFilter<
    T,
    SelectOption<T>
> {
    constructor(column: string, label: string, options: SelectOption<T>[]) {
        super(column, label, options);
    }

    public selectOption(value: T) {
        const option = this.options.find(
            (option: SelectOption<T>) => option.value === value,
        );
        if (option) {
            const condition = new Condition<T, EqualOperation.Equal>(
                this.column,
                EqualOperation.Equal,
                option.value,
            );
            this._conditions = [condition];
            this.apply();
        }
    }
}
