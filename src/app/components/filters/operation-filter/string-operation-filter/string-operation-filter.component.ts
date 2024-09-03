import {
    Component,
    ElementRef,
    HostListener,
    input,
    InputSignal,
} from '@angular/core';
import { ButtonComponent } from '../../../button/button.component';
import { SelectOption } from '../../../../../models/filtering/select-filter/select-option.model';
import { SelectMenuComponent } from '../../../select-menu/select-menu.component';
import { StringOperationFilter } from '../../../../../models/filtering/operation-filter/string-operation-filter.model';
import { AbstractFilterDirective } from '../../filter/abstract-filter.directive';
import { LikeOperation } from '../../../../../models/filtering/operations/like-operation.model';
import { EqualOperation } from '../../../../../models/filtering/operations/equal-operation.model';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-string-operation-filter',
    standalone: true,
    imports: [
        CommonModule,
        ButtonComponent,
        SelectMenuComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './string-operation-filter.component.html',
    styleUrl: './string-operation-filter.component.scss',
})
export class StringOperationFilterComponent extends AbstractFilterDirective {
    public filter: InputSignal<StringOperationFilter> =
        input.required<StringOperationFilter>();

    protected form: FormGroup = new FormGroup({
        operation: new FormControl<LikeOperation | EqualOperation>(
            EqualOperation.Equal,
            [Validators.required],
        ),
        value: new FormControl<string | null>(null, [Validators.required]),
    });

    protected firstToggle: boolean = true;
    public showingContent: boolean = false;
    public filterOptions: SelectOption<LikeOperation | EqualOperation>[] = [
        {
            label: 'Equal',
            value: EqualOperation.Equal,
        },
        {
            label: 'Not equal',
            value: EqualOperation.NotEqual,
        },
        {
            label: 'Like',
            value: LikeOperation.Like,
        },
    ];

    @HostListener('document:click', ['$event'])
    clickOutside(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.showingContent = false;
        }
    }

    constructor(private elementRef: ElementRef) {
        super();
    }

    protected toggleContent(): void {
        if (this.firstToggle) {
            this.firstToggle = false;
        }

        this.showingContent = !this.showingContent;
    }

    protected apply(): void {
        this.filter().apply('1', EqualOperation.Equal);
        this.toggleContent();

        this.onApply.emit();
    }

    protected reset(): void {
        this.filter().reset();
        this.toggleContent();

        this.onReset.emit();
    }
}
