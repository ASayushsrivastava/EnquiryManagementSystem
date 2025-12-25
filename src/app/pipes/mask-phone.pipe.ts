import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask',
  standalone: true,
})
export class PhoneMaskPipe implements PipeTransform {
  transform(phone: string): string {
    if (!phone) return phone;
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) {
      return phone;
    }

    const area = digits.slice(0, 3);
    const middle = digits.slice(3, 6);
    const last = digits.slice(6);

    return `${area}-${middle}-${last}`;
  }
}
