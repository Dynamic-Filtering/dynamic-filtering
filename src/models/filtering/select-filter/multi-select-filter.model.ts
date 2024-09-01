import { Filter } from '../filter.model';
import { Condition } from '../../condition.model';
import { MultiSelectOption } from './multi-select-option.model';
import { EqualOperation } from '../operations/equal-operation.model';

export class MultiSelectFilter<T> extends Filter<T> {
    private options: MultiSelectOption<T>[] = [];
    private column: string;

    constructor(
        displayValue: string,
        column: string,
        options: MultiSelectOption<T>[],
    ) {
        super(displayValue, []);
        this.column = column;
        this.options = options;
    }

    // We assign the same id as the option in order to easily match option with condition since you could add the same option twice under different id's
    public toggleValue(id: number) {
        const option = this.options.find(
            (option: MultiSelectOption<T>) => option.id === id,
        );
        if (option) {
            if (option.selected) {
                const conditionIndex = this._conditions.findIndex(
                    (condition: Condition<T>) => condition.id === option.id,
                );
                if (conditionIndex !== -1) {
                    this._conditions.splice(conditionIndex, 1);
                }
            } else {
                const selectCondition: Condition<T> = new Condition<T>(
                    option.id,
                    this.column,
                    EqualOperation.Equal,
                );
                this._conditions.push(selectCondition);
                option.selected = true;
            }
        }
    }

    public resetOptions() {
        this.options = this.options.map((option: MultiSelectOption<T>) => {
            option.selected = false;
            return option;
        });
        this._conditions.length = 0;
    }

    // May want to split up resetting the conditions from the selected options at some point
    // Same applies for the toggle method
}
