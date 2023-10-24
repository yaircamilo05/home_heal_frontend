import { Component } from '@angular/core';
import { SockectioService } from './services/sockectio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'home_heal_front';

  constructor(private socketSevice: SockectioService) { }
}
