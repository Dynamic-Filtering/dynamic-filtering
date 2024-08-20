import { Filter } from './filter.model';
import { Condition } from '../condition.model';
import { RangeOperation } from './range-operation.model';

export class RangeFilter<T extends number | Date> extends Filter<T> {
    private readonly column;

    constructor(displayValue: string, column: string) {
        super(displayValue, []);
        this.column = column;
    }

    public setRange(
        value1: T,
        operation1: RangeOperation,
        value2: T,
        operation2: RangeOperation,
    ) {
        const condition1 = new Condition<T>(this.column, operation1, value1);
        const condition2 = new Condition<T>(this.column, operation2, value2);

        this.conditions = [condition1, condition2];
    }

    public reset() {
        this.conditions.length = 0;
    }
}
