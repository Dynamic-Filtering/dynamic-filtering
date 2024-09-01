import { Condition } from '../../condition.model';
import { ComparisonOperation } from '../operations/comparison-operation.model';
import { AbstractRangeFilter } from './abstract-range-filter.model';

export class DateRangeFilter extends AbstractRangeFilter<Date> {
    constructor(
        column: string,
        label: string,
        conditions?: Condition<Date, ComparisonOperation>[],
    ) {
        super(column, label, conditions);
    }
}
