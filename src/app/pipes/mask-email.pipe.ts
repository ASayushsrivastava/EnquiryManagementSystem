import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'maskEmail' })
export class MaskEmailPipe implements PipeTransform {
  transform(email: string): string {
    const maskedUser = '****';
    const domain = email.split('@')[1] || '';
    return `${maskedUser}@${domain}`;
  }
}
