import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss']
})
export class HeaderModalComponent {
  @Input() label: string = 'Titulo';
  @Input() type: string = 'purple';
  @Input() iconClass: string = 'fa-solid fa-circle-question';
}
