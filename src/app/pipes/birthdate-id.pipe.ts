import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'birthdateId', standalone: true })
export class BirthdateIdPipe implements PipeTransform {
  private bulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  transform(value: string | Date): string {
    if (!value) return '';
    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) return '';
    const day = date.getDate();
    const month = this.bulan[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
}
