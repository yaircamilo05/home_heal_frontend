import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from 'src/app/common/rols.const';
import { Credentials } from 'src/app/models/credentials.model';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup('');
  user:UserGetWithMenusModel | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog : Dialog
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
      email: ['superadministrador@gmail.com', [Validators.required, Validators.email]],
      password: ['Hola123*', Validators.required]
    })
  }

  login() {
    if (this.form.valid) {
      let data:Credentials = this.form.value
      this.authService.login(data).subscribe(()=>{
        if(this.user?.rol_id != Roles.SUPERADMIN){
          this.router.navigate(['/website']);
        }else if(this.user?.rol_id == Roles.SUPERADMIN){
          this.router.navigate(['/admin']);
        }
      });
    }else{
      console.log('Formulario inválido.');
    }

  }
}
