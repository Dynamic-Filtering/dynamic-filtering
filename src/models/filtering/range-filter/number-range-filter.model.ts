import { RangeFilter } from './range-filter.model';

export class NumberRangeFilter extends RangeFilter<number> {
    constructor(column: string, label: string) {
        super(column, label);
    }
}
