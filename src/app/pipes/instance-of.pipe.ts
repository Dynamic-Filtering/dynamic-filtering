import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'instanceof', standalone: true })
export class InstanceofPipe implements PipeTransform {
    transform(value: any, className: any): boolean {
        return value instanceof className;
    }
}
