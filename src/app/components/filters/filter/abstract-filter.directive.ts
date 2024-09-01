import { Directive, output, OutputEmitterRef } from '@angular/core';

@Directive()
export abstract class AbstractFilterDirective {
    public onReset: OutputEmitterRef<void> = output<void>();
    public onApply: OutputEmitterRef<void> = output<void>();

    // protected reset(): void {
    //     console.log('Reset in filter.component.ts');
    //     this.onReset.emit();
    // }

    // protected apply(): void {
    //     console.log('Apply in filter.component.ts');
    //     this.onApply.emit();
    // }
}
