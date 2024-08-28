import { Condition } from '../condition.model';

export abstract class Filter<T> {
    protected conditions: Condition<T>[] = [];
    public readonly column;
    public label: string;

    constructor(column: string, label: string, conditions?: Condition<T>[]) {
        this.column = column;
        this.label = label;

        if (conditions) {
            this.conditions = conditions;
        }
    }

    get Conditions() {
        return this.conditions;
    }
}
