import { Condition } from '../condition.model';

export abstract class Filter<T> {
    protected conditions: Condition<T>[] = [];
    public label: string;

    constructor(displayValue: string, conditions: Condition<T>[]) {
        this.label = displayValue;
        this.conditions = conditions;
    }

    get Conditions() {
        return this.conditions;
    }
}
