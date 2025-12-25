import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/status.model';

@Pipe({
  name: 'statusLabel',
  standalone: true,
})
export class StatusLabelPipe implements PipeTransform {
  transform(statusId: number, statuses: Status[]): string {
    const status = statuses.find((s) => s.statusId === statusId);
    return status ? status.statusName : 'Unknown';
  }
}
