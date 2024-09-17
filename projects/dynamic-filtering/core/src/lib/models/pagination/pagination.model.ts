export class Pagination {
    public skip: number;
    public take: number;

    constructor(skip: number = 0, take: number = 25) {
        this.skip = skip;
        this.take = take;
    }
}
