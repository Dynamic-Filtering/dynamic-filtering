import { Component, input, InputSignal } from '@angular/core';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})
export class ButtonComponent {
    public label: InputSignal<string> = input.required();
    public type: InputSignal<string> = input('cta'); // cta, primary, secondary
    public size: InputSignal<string> = input('medium'); //Small, medium, large
    // Disabled
    public disabled: InputSignal<boolean> = input(false);
}
