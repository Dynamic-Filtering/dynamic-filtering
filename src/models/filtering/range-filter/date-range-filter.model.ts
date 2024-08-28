import { RangeFilter } from './range-filter.model';

export class DateRangeFilter extends RangeFilter<Date> {
    constructor(column: string, label: string) {
        super(column, label);
    }
}
