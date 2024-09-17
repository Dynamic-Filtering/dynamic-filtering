import { Condition } from "./filtering/condition.model";
import { ComparisonOperation } from "./filtering/operations/comparison-operation.model";
import { EqualOperation } from "./filtering/operations/equal-operation.model";
import { LikeOperation } from "./filtering/operations/like-operation.model";
import { Pagination } from "./pagination/pagination.model";
import { Sorting } from "./sorting/sorting.model";

export class DynamicQueryOption {
    conditions: Condition<
        unknown,
        ComparisonOperation | EqualOperation | LikeOperation
    >[];
    sortings: Sorting[];
    pagination: Pagination;

    constructor(
        conditions: Condition<
            unknown,
            ComparisonOperation | EqualOperation | LikeOperation
        >[],
        sortings: Sorting[],
        pagination: Pagination,
    ) {
        this.conditions = conditions;
        this.sortings = sortings;
        this.pagination = pagination;
    }
}
