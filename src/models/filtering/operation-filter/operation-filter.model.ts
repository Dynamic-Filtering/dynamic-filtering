import { Filter } from '../filter.model';
import { Condition } from '../../condition.model';
import { ComparisonOperation } from '../operations/comparison-operation.model';
import { EqualOperation } from '../operations/equal-operation.model';
import { LikeOperation } from '../operations/like-operation.model';

export abstract class OperationFilter<
    T extends string | number | Date,
> extends Filter<T> {
    constructor(column: string, label: string) {
        super(column, label);
    }

    public apply(
        value: T,
        operation: ComparisonOperation | EqualOperation | LikeOperation,
    ): void {
        const condition = new Condition<T>(this.column, operation, value);
        this._conditions = [condition];
        this.onApply.emit();
    }

    public reset(): void {
        this._conditions.length = 0;
        this.onReset.emit();
    }
}
