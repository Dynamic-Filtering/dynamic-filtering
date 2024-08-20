import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    computed,
    effect,
    EventEmitter,
    Injector,
    input,
    InputSignal,
    Output,
    Renderer2,
    Signal,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { Filter } from '../../../models/filtering/filter.model';
import { InstanceofPipe } from '../../pipes/instance-of.pipe';
import { SelectFilterComponent } from './select-filter/select-filter.component';
import { SelectFilter } from '../../../models/filtering/select-filter.model';
import { RangeFilter } from '../../../models/filtering/range-filter.model';
import { RangeFilterComponent } from './range-filter/range-filter.component';
import { SelectOption } from '../../../models/filtering/select-option.model';

@Component({
    selector: 'app-filter',
    standalone: true,
    imports: [CommonModule, SelectFilterComponent],
    templateUrl: './filter.component.html',
})
export class FilterComponent implements AfterViewInit {
    public filter: InputSignal<Filter<unknown>> =
        input.required<Filter<unknown>>();
    @Output() optionSelected: EventEmitter<SelectOption<unknown>> =
        new EventEmitter<any>();
    @Output() reset: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('filterContainer', { read: ViewContainerRef })
    filterContainer!: ViewContainerRef;

    private componentMap = new Map<any, any>([
        [SelectFilter, SelectFilterComponent],
        [RangeFilter, RangeFilterComponent],
    ]);

    public ngAfterViewInit() {
        this.loadComponent();
    }

    private loadComponent() {
        const componentType = this.componentMap.get(this.filter().constructor);

        if (componentType) {
            const componentRef =
                this.filterContainer.createComponent(componentType);
            (componentRef.instance as any).filter = this.filter;

            if (componentRef.instance instanceof SelectFilterComponent) {
                componentRef.instance.optionSelected.subscribe(
                    (option: SelectOption<unknown>) => {
                        this.optionSelectedHandler(option);
                    }
                );
            } else if (componentRef.instance instanceof RangeFilterComponent) {
                // Register component specific events
            }
        }
    }

    protected optionSelectedHandler(option: SelectOption<unknown>): void {
        console.log('Event caucht from child and re-emitted');
        this.optionSelected.emit(option);
    }

    protected resetHandler(): void {
        console.log('Event caucht from child and re-emitted');
        this.optionSelected.emit();
    }
}
