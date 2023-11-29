import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseCustomModel } from './../../../../models/response.custom.model';
import { ModalService } from 'src/app/services/modal.service';
import { Messages } from 'src/app/common/messages.const';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent {
  form: FormGroup = new FormGroup('');
  router = Inject(Router);
  loading: boolean = false;
  constructor(
    private autService: AuthService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    this.builForm();
  }

  builForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }
  sendLinkRecoveryPassword() {
    if (this.form.valid) {
      this.loading = true;
      this.autService.recoveryPassword(this.form.value.email).subscribe({
        next: (response: ResponseCustomModel<boolean>) => {
          this.router.navigate(['/security/send-email']);
        },
        error: (error) => {
          this.loading = false;
          this.modalService.openToastErrorAction(Messages.ErrorEmail);
        }
      });
    }else{
      this.form.markAllAsTouched();
    }
  }


  get fg() {
    return this.form.controls;
  }
}

