import { Pipe, PipeTransform } from '@angular/core';
import { PatientCard } from 'src/app/models/patient.model';

@Pipe({
  name: 'multiplexorFilterPipe'
})
export class MultiplexorFilterPipe implements PipeTransform {
  transform(items: any[], searchCriteria: {[key: string]: string}, limit?: number): any[] {
    if (!items || !searchCriteria) {
      return items;
    }

    let filteredItems = items.filter(item => {
      return Object.keys(searchCriteria).every(key => {
        const searchValue = searchCriteria[key].toLowerCase();
        return item[key] && item[key].toString().toLowerCase().includes(searchValue);
      });
    });

    if (limit !== undefined && limit !== null) {
      return filteredItems.slice(0, limit);
    }

    return filteredItems;
  }
}