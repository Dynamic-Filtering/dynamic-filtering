import { Condition } from '../condition.model';
import { ComparisonOperation } from '../operations/comparison-operation.model';
import { AbstractRangeFilter } from './abstract-range-filter.model';

export class NumberRangeFilter extends AbstractRangeFilter<number> {
    constructor(
        column: string,
        label: string,
        conditions?: Condition<number, ComparisonOperation>[]
    ) {
        super(column, label, conditions);
    }
}
