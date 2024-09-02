import { Condition } from './condition.model';
import { ComparisonOperation } from './filtering/operations/comparison-operation.model';
import { EqualOperation } from './filtering/operations/equal-operation.model';
import { LikeOperation } from './filtering/operations/like-operation.model';
import { Pagination } from './pagination/pagination.model';
import { Sorting } from './sorting/sorting.model';

export interface DynamicQueryOption {
    filters: Condition<
        unknown,
        ComparisonOperation | EqualOperation | LikeOperation
    >[];
    sortings: Sorting[];
    pagination: Pagination;
}
