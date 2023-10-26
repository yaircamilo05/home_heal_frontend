import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = new FormGroup('');

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.builForm();
  }

  builForm() {
    this.form = this.formBuilder.group({
      email: ['luisandres@gmail.com', [Validators.required, Validators.email]],
      password: ['Hola123*', Validators.required]
    })
  }

  login() {
    if (this.form.valid) {
      let data:Credentials = this.form.value
      this.authService.login(data).subscribe(()=>{
        this.router.navigate(['/website']);
      });
    }else{
      console.log('Formulario inválido.');
    }

  }
}
