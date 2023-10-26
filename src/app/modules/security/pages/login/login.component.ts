import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Credentials } from 'src/app/models/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) {
   
  }

  login(){
      const credential:Credentials = {
      email: 'luisandres@gmail.com',
      password: 'Hola123*'
    }
    this.authService.login(credential).subscribe();
  }
}
