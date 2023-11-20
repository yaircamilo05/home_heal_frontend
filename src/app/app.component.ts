import { Component } from '@angular/core';
import { SockectioService } from './services/sockectio.service';
import { StorageService } from './services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserGetWithMenusModel } from './models/user.model';
import { AzurepsService } from './services/azureps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'home_heal_front';
  user: UserGetWithMenusModel | null = null;
  constructor(
    // private socketSevice: SockectioService,
    private azurepsService: AzurepsService,
    private storageService: StorageService,
    private authService: AuthService
  ) {

   }

  ngOnInit() {
    this.userLogged();
    // this.socketSevice.onConnectToRoom();
  }
  userLogged() {
    const token = this.storageService.getToken();
    if (token) {
      this.authService.validateToken().subscribe();
    }
  }
}
