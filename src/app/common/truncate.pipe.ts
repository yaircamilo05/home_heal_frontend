import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'truncateText'
})
export class TruncatePipe implements PipeTransform {
  transform(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...'
    } else {
      return text
    }
  }
}
