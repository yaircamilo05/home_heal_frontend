import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseChangePasswordModel } from 'src/app/models/response.change.password';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  form: FormGroup = new FormGroup('');
  loading: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  token: string = '';
  constructor(
    private autService: AuthService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.builForm();
    this.route.queryParamMap.subscribe(params => {
      const tokenParam = params.get('token');
      if (tokenParam) {
        this.token = tokenParam;
      } else {
        router.navigate(['/login']);
      }
    });
  }

  builForm() {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }
  changePassword() {
    console.log(this.form.valid);
    if (this.form.valid) {
      if (this.form.value.password !== this.form.value.confirmPassword) {
        this.modalService.openToastErrorAction('Las contraseñas no coinciden');
        return;
      } else {
        this.loading = true;
        console.log(this.form.value);
        this.autService.changePassword(this.form.value.password, this.token).subscribe({
          next: (response:ResponseChangePasswordModel) => {
            if (response.data) {
              this.loading = false;
              this.modalService.openToastSuccessAction('Contraseña cambiada con exito');
              this.router.navigate(['/login']);
            }
          },
          error: (error) => {
            console.log(error);
            this.loading = false;
            this.modalService.openToastErrorAction('Error al cambiar la contraseña');
          }
        });
      }
    } else {
      this.form.markAllAsTouched();
    }

  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  get fg() {
    return this.form.controls;
  }



}
