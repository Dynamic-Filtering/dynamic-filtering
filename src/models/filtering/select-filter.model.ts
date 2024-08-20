import { Filter } from './filter.model';
import { Condition } from '../condition.model';
import { SelectOption } from './select-option.model';
import { OtherOperation } from './other-operation.model';

export class SelectFilter<T> extends Filter<T> {
    private options: SelectOption<T>[] = [];

    constructor(
        displayValue: string,
        column: string,
        options: SelectOption<T>[],
    ) {
        const selectCondition: Condition<T> = new Condition<T>(
            column,
            OtherOperation.Equal,
        );
        const conditions = [selectCondition];

        super(displayValue, conditions);
        this.options = options;
    }

    get Options() {
        return this.options;
    }

    public selectValue(id: number) {
        const option = this.options.find(
            (option: SelectOption<T>) => option.id === id,
        );
        if (option) {
            this.conditions[0].value = option.value;
        }
    }

    public resetValue() {
        this.conditions[0].value = undefined;
    }

    // Might need options for replacing the list with a new one or adding and remove items
}
