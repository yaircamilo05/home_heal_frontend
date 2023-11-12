import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages } from 'src/app/common/messages.const';
import { Roles } from 'src/app/common/rols.const';
import { Credentials } from 'src/app/models/credentials.model';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup('');
  user: UserGetWithMenusModel | null = null;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.builForm();
  }

  ngOnInit(): void {
    this.getUserLogged();
  }

  getUserLogged() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }
  builForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['Hola123*', Validators.required]
    })
  }

  // login() {
  //   if (this.form.valid) {
  //     let data: Credentials = this.form.value
  //     this.authService.login(data).subscribe({
  //       next: (data) => {
  //         this.authService.user$.subscribe(user => {
  //           this.user = user;
  //           console.log(user);
  //           console.log(user?.rol_id);
  //           if (user?.rol_id != Roles.SUPERADMIN) {
  //             this.router.navigate(['/website']);
  //             this.modalService.openToastWelcome(Messages.WelcomeWebsite);
  //           } else if (user?.rol_id == Roles.SUPERADMIN) {
  //             this.router.navigate(['/admin']);
  //             this.modalService.openToastWelcome(Messages.WelcomeAdmin);
  //           }
  //         });
  //       },

  //       error: (err) => {
  //         if (err.status == 404) {
  //           this.modalService.openToastErrorAction(Messages.ErrorEmail);
  //         } else if (err.status == 500) {
  //           this.modalService.openToastErrorAction(Messages.ErrorPassword);
  //         }
  //       }

  //     });
  //   } else {
  //     this.modalService.openToastErrorAction(Messages.ErrorLogin);

  //   }

  // }

  login() {
    if (this.form.valid) {
      let data: Credentials = this.form.value
      this.authService.login(data).subscribe({
        next: (response) => {
        if (response) {
          this.authService.user$.subscribe(user => {
            if (user != undefined) {
              console.log(user);
              console.log(user?.rol_id);
              if (user?.rol_id != Roles.SUPERADMIN) {
                this.router.navigate(['/website']);
                this.modalService.openToastWelcome(Messages.WelcomeWebsite);
              } else if (user?.rol_id == Roles.SUPERADMIN) {
                this.router.navigate(['/admin']);
                this.modalService.openToastWelcome(Messages.WelcomeAdmin);
              }
            }
          });
        }
      },
        error: (err) => {
          if (err.status == 404) {
            this.modalService.openToastErrorAction(Messages.ErrorEmail);
          } else if (err.status == 500) {
            this.modalService.openToastErrorAction(Messages.ErrorPassword);
          }
        }
      });
    }else{
      this.modalService.openToastErrorAction(Messages.ErrorLogin);
    }

  }
  get fg() {
    return this.form.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;

  }
}
