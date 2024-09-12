import { EqualOperation } from '../operations/equal-operation.model';
import { ComparisonOperation } from '../operations/comparison-operation.model';
import { AbstractOperationFilter } from './abstract-operation-filter.model';
import { Condition } from '../condition.model';

export class NumberOperationFilter extends AbstractOperationFilter<
    number,
    ComparisonOperation | EqualOperation
> {
    constructor(
        column: string,
        label: string,
        conditions?: Condition<number, ComparisonOperation | EqualOperation>[]
    ) {
        super(column, label, conditions);
    }

    public override apply(
        value: number,
        operation: ComparisonOperation | EqualOperation
    ): void {
        super.apply(value, operation);
    }
}
