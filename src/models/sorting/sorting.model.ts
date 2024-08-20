import { SortingDirection } from './sorting-direction.model';

export class Sorting {
    column: string;
    sortingDirection: SortingDirection;

    constructor(column: string, sortingDirection: SortingDirection) {
        this.column = column;
        this.sortingDirection = sortingDirection;
    }
}
