import { Condition } from './condition.model';
import { Pagination } from './pagination/pagination.model';
import { Sorting } from './sorting/sorting.model';

export interface DynamicQueryOption {
    filters: Condition<unknown>[];
    sortings: Sorting[];
    pagination: Pagination;
}
