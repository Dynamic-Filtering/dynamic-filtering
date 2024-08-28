import { Filter } from '../filter.model';
import { Condition } from '../../condition.model';
import { ComparisonOperation } from '../operations/comparison-operation.model';

export abstract class RangeFilter<T extends number | Date> extends Filter<T> {
    constructor(column: string, label: string) {
        super(column, label, []);
    }

    public apply(
        value1: T,
        operation1: ComparisonOperation,
        value2: T,
        operation2: ComparisonOperation,
    ) {
        const condition1 = new Condition<T>(this.column, operation1, value1);
        const condition2 = new Condition<T>(this.column, operation2, value2);

        this.conditions = [condition1, condition2];
    }

    public reset() {
        this.conditions.length = 0;
    }
}
