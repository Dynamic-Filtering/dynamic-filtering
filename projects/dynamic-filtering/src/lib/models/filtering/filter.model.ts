import { EventEmitter } from '@angular/core';
import { Condition } from './condition.model';
import { ComparisonOperation } from './operations/comparison-operation.model';
import { EqualOperation } from './operations/equal-operation.model';
import { LikeOperation } from './operations/like-operation.model';

export abstract class Filter<
    T,
    R extends ComparisonOperation | EqualOperation | LikeOperation
> {
    public readonly column: string;
    public readonly label: string;

    protected _conditions: Condition<T, R>[] = [];
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

    constructor(column: string, label: string, conditions?: Condition<T, R>[]) {
        this.column = column;
        this.label = label;

        if (conditions) {
            this._conditions = conditions;
        }
    }

    public reset(): void {
        this._conditions.length = 0;
        this.onReset.emit();
    }
}
