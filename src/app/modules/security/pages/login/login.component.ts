import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { State } from 'src/app/models/estate.model';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = new FormGroup('');
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.builForm();
  }

  builForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    })
  }

  login() {
    if (this.form.valid) {
      console.log('Formulario inválido.');
    }
    let data = this.form.value
    console.log(data);
  }
}
