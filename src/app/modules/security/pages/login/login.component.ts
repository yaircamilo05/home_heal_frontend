import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
      email: ['luisandres@gmail.com', [Validators.required, Validators.email]],
      pass: ['Hola123*', Validators.required]
    })
  }

  login() {
    if (this.form.valid) {
      let data = this.form.value
      console.log(data);
    }else{
      console.log('Formulario inválido.');
    }

  }
}
