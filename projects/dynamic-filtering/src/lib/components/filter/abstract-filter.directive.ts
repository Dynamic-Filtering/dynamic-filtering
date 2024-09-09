import { Directive, output, OutputEmitterRef } from '@angular/core';

@Directive()
export abstract class AbstractFilterDirective {
    public onReset: OutputEmitterRef<void> = output<void>();
    public onApply: OutputEmitterRef<void> = output<void>();
}
