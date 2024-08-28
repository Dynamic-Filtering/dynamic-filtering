import { SelectOption } from './select-option.model';

export class MultiSelectOption<T> extends SelectOption<T> {
    selected: boolean = false;

    constructor(id: number, label: string, value: T, selected?: boolean) {
        super(id, label, value);

        if (selected !== undefined) {
            this.selected = selected;
        }
    }
}
