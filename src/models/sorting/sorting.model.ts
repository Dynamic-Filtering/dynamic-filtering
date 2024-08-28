import { SortingDirection } from './sorting-direction.model';

export class Sorting {
    column: string;
    direction: SortingDirection;

    constructor(column: string, sortingDirection: SortingDirection) {
        this.column = column;
        this.direction = sortingDirection;
    }
}
