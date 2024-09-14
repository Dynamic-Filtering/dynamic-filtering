import { Filter } from '../filter.model';
import { Condition } from '../condition.model';
import { ComparisonOperation } from '../operations/comparison-operation.model';

export abstract class AbstractRangeFilter<
    T extends number | Date
> extends Filter<T, ComparisonOperation> {
    constructor(
        column: string,
        label: string,
        conditions?: Condition<T, ComparisonOperation>[]
    ) {
        if (conditions && conditions.length > 2) {
            throw new RangeError('Range filters only support 1 or 2 condition');
        }

        super(column, label, conditions);
    }

    public apply(
        value1: T,
        operation1: ComparisonOperation,
        value2: T,
        operation2: ComparisonOperation
    ) {
        const condition1 = new Condition<T, ComparisonOperation>(
            this.column,
            operation1,
            value1
        );
        const condition2 = new Condition<T, ComparisonOperation>(
            this.column,
            operation2,
            value2
        );

        this._conditions = [condition1, condition2];
    }
}
