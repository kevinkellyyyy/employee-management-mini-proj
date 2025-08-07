import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyId', standalone: true })
export class CurrencyIdPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value == null) return '';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return `Rp${num.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`;
  }
}
