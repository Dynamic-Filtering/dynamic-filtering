import { SelectOption } from './select-option.model';

export class MultiSelectOption<T> extends SelectOption<T> {
    selected: boolean = false;

    constructor(label: string, value: T, selected?: boolean) {
        super(label, value);

        if (selected !== undefined) {
            this.selected = selected;
        }
    }
}
