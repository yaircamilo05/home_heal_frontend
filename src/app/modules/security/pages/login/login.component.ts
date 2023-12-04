import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages } from 'src/app/common/messages.const';
import { Roles } from 'src/app/common/rols.const';
import { Credentials } from 'src/app/models/credentials.model';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { ModalService } from 'src/app/services/modal.service';
import { SockectioService } from './../../../../services/sockectio.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup('');
  user: UserGetWithMenusModel | null = null;
  showPassword: boolean = false;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService,
    private emailService: EmailService,
    private socketService: SockectioService,
    private storageService: StorageService
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
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.form.valid) {
      let data: Credentials = this.form.value

      this.loading = true;
      this.authService.login(data).subscribe({
      next: (response) => {
        if (response) {
          this.authService.user$.subscribe(user => {
            if (user != undefined) {
              this.storageService.saveUserId(user.id);
              this.storageService.saveRolId(user.rol_id);
              this.storageService.saveUserName(user.name);
              if (user?.rol_id == Roles.PACIENTE) {
                this.router.navigate(['/website']);
                this.modalService.openToastWelcome(Messages.WelcomeWebsite);
              } else if (user?.rol_id == Roles.SUPERADMIN) {
                this.router.navigate(['/admin/init-admin']);
                this.modalService.openToastWelcome(Messages.WelcomeAdmin);
              } else if (user?.rol_id == Roles.MEDICO) {
                this.router.navigate(['/website']);
                this.modalService.openToastWelcome(Messages.WelcomeDoctor);
              } else if (user?.rol_id == Roles.FAMILIAR) {
                this.router.navigate(['/website']);
                this.modalService.openToastWelcome(Messages.WelcomeFamiliar);
              }
            }
          });
        }
        //conectarce al socket
        this.storageService.saveUsername(data.email);
      },
        error: (err) => {
          this.loading = false;
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
