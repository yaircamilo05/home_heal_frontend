import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  closeModalEvent: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }
  close() {
    this.closeModalEvent.emit();
  }
}
