import { EqualOperation } from './filtering/operations/equal-operation.model';
import { ComparisonOperation } from './filtering/operations/comparison-operation.model';
import { LikeOperation } from './filtering/operations/like-operation.model';

export class Condition<T> {
    column: string;
    operation: ComparisonOperation | EqualOperation | LikeOperation;
    value?: T;

    constructor(
        column: string,
        operation: ComparisonOperation | EqualOperation | LikeOperation,
        value?: T,
    ) {
        this.column = column;
        this.operation = operation;
        this.value = value;
    }
}
