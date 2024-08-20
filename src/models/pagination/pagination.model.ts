export class Pagination {
    skip: number = 0;
    take: number = 25;

    constructor(skip: number, take: number) {
        this.skip = skip;
        this.take = take;
    }
}
