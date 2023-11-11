import { Component } from '@angular/core';
import { SockectioService } from './services/sockectio.service';
import { StorageService } from './services/storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'home_heal_front';

  constructor(
    private socketSevice: SockectioService,
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userLogged();
  }
  userLogged() {
    const token = this.storageService.getToken();
    if (token) {
      this.authService.validateToken().subscribe();
    }
  }
}
