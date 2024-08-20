export class SelectOption<T> {
    id: number;
    label: string;
    value: T;

    constructor(id: number, label: string, value: T) {
        this.id = id;
        this.label = label;
        this.value = value;
    }
}
