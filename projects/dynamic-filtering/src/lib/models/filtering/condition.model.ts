export class Condition<T, R> {
    column: string;
    operation: R;
    value: T;

    constructor(column: string, operation: R, value: T) {
        this.column = column;
        this.operation = operation;
        this.value = value;
    }
}
