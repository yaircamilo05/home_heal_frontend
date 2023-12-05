import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss'],
})
export class InitComponent {
  
  constructor(
    private localStorage: StorageService,
  ) {}

  getRole() {
    return this.localStorage.getRolId();
  }
}
