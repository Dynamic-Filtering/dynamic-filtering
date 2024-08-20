import { SelectOption } from './select-option.model';

export class MultiSelectOption<T> extends SelectOption<T> {
    checked: boolean = false;

    constructor(id: number, label: string, value: T, checked?: boolean) {
        super(id, label, value);

        if (checked !== undefined) {
            this.checked = checked;
        }
    }
}
