import { SortingDirection } from "./sorting-direction.model";

export class Sorting {
    public column: string;
    public direction: SortingDirection;

    constructor(column: string, sortingDirection: SortingDirection) {
        this.column = column;
        this.direction = sortingDirection;
    }
}
