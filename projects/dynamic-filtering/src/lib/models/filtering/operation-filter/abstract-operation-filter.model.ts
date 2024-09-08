import { Filter } from '../filter.model';
import { Condition } from '../condition.model';
import { ComparisonOperation } from '../operations/comparison-operation.model';
import { EqualOperation } from '../operations/equal-operation.model';
import { LikeOperation } from '../operations/like-operation.model';

export abstract class AbstractOperationFilter<
    T extends string | number | Date,
    R extends ComparisonOperation | EqualOperation | LikeOperation
> extends Filter<T, R> {
    constructor(column: string, label: string, conditions?: Condition<T, R>[]) {
        if (conditions && conditions.length > 1) {
            throw new RangeError(
                'Operation filters only support a single condition'
            );
        }

        super(column, label, conditions);
    }

    public apply(value: T, operation: R): void {
        const condition = new Condition<T, R>(this.column, operation, value);
        this._conditions = [condition];
        this.onApply.emit();
    }

    public reset(): void {
        this._conditions.length = 0;
        this.onReset.emit();
    }
}
