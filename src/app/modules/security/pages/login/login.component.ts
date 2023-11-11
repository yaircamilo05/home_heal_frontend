import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from 'src/app/common/rols.const';
import { Credentials } from 'src/app/models/credentials.model';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup('');
  user:UserGetWithMenusModel | null = null;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.builForm();
  }

  ngOnInit(): void {
    this.getUserLogged();
   }

   getUserLogged(){
     this.authService.user$.subscribe(user =>{
       this.user = user;
     });
   }
  builForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['Hola123*', Validators.required]
    })
  }

  login() {
    if (this.form.valid) {
      let data:Credentials = this.form.value
      this.authService.login(data).subscribe({
        next: (data) => {
          if(this.user?.rol_id != Roles.SUPERADMIN){
            this.router.navigate(['/website']);
          }else if(this.user?.rol_id == Roles.SUPERADMIN){
            this.router.navigate(['/admin']);
          }
        },

        error: (err) => {
          if (err.status == 404) {
            console.log('¡Oh no! Tu correo no está registrado');
            this.toastService.show('¡Oh no! Tu correo no está registrado', 'error');
          } else if (err.status == 500) {
            console.log('¡Oh no! Tu contraseña es incorrecta');
          }
        }
        
      });
    }else{
      console.log('¡Oh no! Debes llenar todos los campos');

    }

  }

  get fg() {
    return this.form.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
