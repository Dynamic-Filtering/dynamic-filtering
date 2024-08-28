import { EqualOperation } from '../operations/equal-operation.model';
import { ComparisonOperation } from '../operations/comparison-operation.model';
import { OperationFilter } from './operation-filter.model';

export class DateOperationFilter extends OperationFilter<Date> {
    public readonly operations = { ...ComparisonOperation, ...EqualOperation };

    constructor(column: string, label: string) {
        super(column, label);
    }
}
