import { LikeOperation } from '../operations/like-operation.model';
import { EqualOperation } from '../operations/equal-operation.model';
import { OperationFilter } from './operation-filter.model';

export class StringOperationFilter extends OperationFilter<string> {
    public readonly operations = { ...LikeOperation, ...EqualOperation };
    public readonly operationTypes: typeof this.operations = this.operations;

    constructor(column: string, label: string) {
        super(column, label);
    }

    // Perhaps I should override the apply method to only support the defined operations
}
