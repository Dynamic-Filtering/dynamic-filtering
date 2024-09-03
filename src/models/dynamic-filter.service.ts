import { HttpParams } from '@angular/common/http';
import { Condition } from './condition.model';
import { ComparisonOperation } from './filtering/operations/comparison-operation.model';
import { EqualOperation } from './filtering/operations/equal-operation.model';
import { LikeOperation } from './filtering/operations/like-operation.model';
import { Sorting } from './sorting/sorting.model';
import { Pagination } from './pagination/pagination.model';
import { DynamicQueryOption } from './dynamic-query-option.model';

export abstract class DynamicFilterService {
    public static formatConditionsToHttpParams(
        conditions: Condition<
            any,
            ComparisonOperation | EqualOperation | LikeOperation
        >[],
        httpParams: HttpParams
    ): HttpParams {
        for (let index = 0; index < conditions.length; index++) {
            httpParams = httpParams.set(
                `Conditions[${index}].Column`,
                conditions[index].column
            );
            httpParams = httpParams.set(
                `Conditions[${index}].Operation`,
                conditions[index].operation
            );
            httpParams = httpParams.set(
                `Conditions[${index}].Value`,
                conditions[index].value
            );
        }

        return httpParams;
    }

    public static formatSortingsToHttpParams(
        sortings: Sorting[],
        httpParams: HttpParams
    ): HttpParams {
        for (let index = 0; index < sortings.length; index++) {
            httpParams = httpParams.set(
                `Sortings[${index}].Column`,
                sortings[index].column
            );
            httpParams = httpParams.set(
                `Sortings[${index}].Direction`,
                sortings[index].direction
            );
        }

        return httpParams;
    }

    public static formatPaginationToHttpParams(
        pagination: Pagination,
        httpParams: HttpParams
    ): HttpParams {
        httpParams = httpParams.set(`Pagination.Skip`, pagination.skip);
        httpParams = httpParams.set(`Pagination.Take`, pagination.take);

        return httpParams;
    }

    public static formatDynamicQueryOptionToHttpParams(
        dynamicQueryOption: DynamicQueryOption,
        httpParams: HttpParams
    ): HttpParams {
        httpParams = this.formatConditionsToHttpParams(
            dynamicQueryOption.conditions,
            httpParams
        );
        httpParams = this.formatSortingsToHttpParams(
            dynamicQueryOption.sortings,
            httpParams
        );
        httpParams = this.formatPaginationToHttpParams(
            dynamicQueryOption.pagination,
            httpParams
        );

        return httpParams;
    }
}
