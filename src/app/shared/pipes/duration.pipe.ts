import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform([start, end]: [string | Date, string | Date]): string {
    if (!start || !end) return '';
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    const paddedMinutes = remaining.toString().padStart(2, '0');
    return `${hours}h${paddedMinutes}m`;
  }
}
