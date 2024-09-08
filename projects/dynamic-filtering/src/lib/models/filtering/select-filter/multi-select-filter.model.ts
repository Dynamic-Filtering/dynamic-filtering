import { Condition } from '../condition.model';
import { EqualOperation } from '../operations/equal-operation.model';
import { MultiSelectOption } from '../options/multi-select-option.model';
import { AbstractSelectFilter } from './abstract-select-filter.model';

export class MultiSelectFilter<T> extends AbstractSelectFilter<
    T,
    MultiSelectOption<T>
> {
    constructor(
        column: string,
        label: string,
        options: MultiSelectOption<T>[]
    ) {
        super(column, label, options);
    }

    // Have to think whether we want to instantly add the condition on select
    // If we don't then we should keep an internal list of selected options and add them as conditions on apply
    public selectOption(value: T) {
        const option = this.options.find(
            (option: MultiSelectOption<T>) => option.value === value
        );
        if (option) {
            if (option.selected) {
                const conditionIndex = this._conditions.findIndex(
                    (condition: Condition<T, EqualOperation.Equal>) =>
                        condition.value === option.value
                );
                if (conditionIndex !== -1) {
                    this._conditions.splice(conditionIndex, 1);
                    option.selected = false;
                }
            } else {
                const selectCondition: Condition<T, EqualOperation.Equal> =
                    new Condition<T, EqualOperation.Equal>(
                        this.column,
                        EqualOperation.Equal,
                        option.value
                    );
                this._conditions.push(selectCondition);
                option.selected = true;
            }
        }
    }

    public override reset(): void {
        this._options = this._options.map((option: MultiSelectOption<T>) => {
            option.selected = false;
            return option;
        });

        super.reset();
    }

    // May want to split up resetting the conditions from the selected options at some point
    // Same applies for the toggle method
}
