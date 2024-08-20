import { OtherOperation } from './filtering/other-operation.model';
import { RangeOperation } from './filtering/range-operation.model';

export class Condition<T> {
    column: string;
    operation: RangeOperation | OtherOperation;
    value?: T;

    constructor(
        column: string,
        operation: RangeOperation | OtherOperation,
        value?: T,
    ) {
        this.column = column;
        this.operation = operation;
        this.value = value;
    }
}
