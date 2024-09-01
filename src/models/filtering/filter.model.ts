import { EventEmitter } from '@angular/core';
import { Condition } from '../condition.model';

export abstract class Filter<T> {
    public readonly column;
    public readonly label: string;

    protected _conditions: Condition<T>[] = [];
    get conditions() {
        return this._conditions;
    }

    private _onReset: EventEmitter<void> = new EventEmitter();
    get onReset() {
        return this._onReset;
    }

    private _onApply: EventEmitter<void> = new EventEmitter();
    get onApply() {
        return this._onApply;
    }

    constructor(column: string, label: string, conditions?: Condition<T>[]) {
        this.column = column;
        this.label = label;

        if (conditions) {
            this._conditions = conditions;
        }
    }
}
