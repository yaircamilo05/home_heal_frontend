import { Component, EventEmitter, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss']
})
export class HeaderModalComponent {
  @Input() label: string = 'Titulo';
  @Input() type: string = 'purple';
  @Input() iconClass: string = 'fa-solid fa-circle-question';
  @Input() imageUser: string = '';
  @Input() userName: string = '';
  @Input() closeModalEvent: () => void = () => { };

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.close();
  }
}
