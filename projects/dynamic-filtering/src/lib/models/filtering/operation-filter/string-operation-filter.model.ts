import { LikeOperation } from '../operations/like-operation.model';
import { EqualOperation } from '../operations/equal-operation.model';
import { AbstractOperationFilter } from './abstract-operation-filter.model';
import { Condition } from '../condition.model';

export class StringOperationFilter extends AbstractOperationFilter<
    string,
    EqualOperation | LikeOperation
> {
    constructor(
        column: string,
        label: string,
        conditions?: Condition<string, EqualOperation | LikeOperation>[]
    ) {
        super(column, label, conditions);
    }
}
