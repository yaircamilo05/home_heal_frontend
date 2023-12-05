import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiplexorFilterPipe'
})
export class MultiplexorFilterPipe implements PipeTransform {
  transform(items: any[], searchCriteria: { [key: string]: string }, limit?: number): any[] {
    if (!items || !searchCriteria) {
      return items;
    }

    let filteredItems = items.filter(item => {
      return Object.keys(searchCriteria).every(key => {
        if (key === 'date' && searchCriteria[key]) {
          const itemDate = new Date(item[key]);
          const startDate = new Date(searchCriteria[key]);
          return itemDate >= startDate;
        } else {
          const searchValue = searchCriteria[key].toLowerCase();
          return item[key] && item[key].toString().toLowerCase().includes(searchValue);
        }
      });
    });

    if (limit !== undefined && limit !== null) {
      return filteredItems.slice(0, limit);
    }

    return filteredItems;
  }
}
