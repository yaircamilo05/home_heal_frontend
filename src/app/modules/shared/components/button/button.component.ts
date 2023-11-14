import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() type: string = 'btn-confirmar';
  @Input() text: string = 'Button';
  @Input() icon: string = '';
}
