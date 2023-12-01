import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages } from 'src/app/common/messages.const';
import { EmailRegisterModel } from 'src/app/models/email.model';
import { PatientRegister } from 'src/app/models/patient.model';
import { EmailService } from 'src/app/services/email.service';
import { ModalService } from 'src/app/services/modal.service';
import { PatientService } from 'src/app/services/patient.service';
import { environment } from 'src/environments/environment.local';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form_patient: FormGroup = new FormGroup('');
  form_familiar: FormGroup = new FormGroup('');
  image_file!: File | null;
  show_password: boolean = false;
  selected_file: boolean = false;
  image_url_not_upload: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private modalService: ModalService,
    private router: Router,
    private emailService: EmailService
    ) {

    this.buildForm();
  }

  register() {

    const formData = new FormData();

    let user: PatientRegister = {
      name: this.form_patient.get('name')?.value,
      lastname: this.form_patient.get('lastname')?.value,
      phone: this.form_patient.get('phone')?.value,
      email: this.form_patient.get('email')?.value,
      cc: this.form_patient.get('CC')?.value,
      birthdate: this.form_patient.get('birthdate')?.value,
      description: this.form_patient.get('description')?.value,
      address: this.form_patient.get('address')?.value,
      gender: this.form_patient.get('gender')?.value,
      password: this.form_patient.get('password')?.value,
      familiar_name: this.form_familiar.get('familiar_name')?.value,
      familiar_lastname: this.form_familiar.get('familiar_lastname')?.value,
      familiar_email: this.form_familiar.get('familiar_email')?.value,
      familiar_phone: this.form_familiar.get('familiar_phone')?.value,
    };

    formData.append('user', JSON.stringify(user));

    if(this.selected_file){
      formData.append('image_file', this.image_file as File);
      this.send_request(formData);

    } else {

      this.patientService.get_default_image().subscribe({
        next: (blob) => {
          let file = new File([blob], 'userImageNotFound.png', { type: 'image/png' });
          this.image_file = file;
          formData.append('image_file', this.image_file);
          this.send_request(formData);
        }
      })

    }
  }

  send_request(formData: FormData) {
    this.loading = true;
    this.patientService.register_patient(formData).subscribe({
      next: (response) => {
        if(response) {
          this.modalService.openToastSuccessAction(Messages.SuccessRegister);
          this.router.navigate(['/login']);
          this.send_email();
          console.log(response);
          this.loading = false;
        }
      },
      error: (error) => {
        this.loading = false;
        if (error.status == 500) {
          this.modalService.openToastErrorAction(Messages.ErrorRegister);
        }
      }
    })
  }

  send_email() {
    let data_patient: EmailRegisterModel = {
      hash: environment.hash_validator,
      to_destination: this.form_patient.get('email')?.value,
      name: this.form_patient.get('name')?.value,
      password: this.form_patient.get('password')?.value
    }

    let data_familiar: EmailRegisterModel = {
      hash: environment.hash_validator,
      to_destination: this.form_familiar.get('familiar_email')?.value,
      name: this.form_patient.get('familiar_name')?.value,
      password: this.form_patient.get('password')?.value
    }

    this.emailService.send_email_register_patient(data_patient).subscribe({
      next: (response) => {
        console.log(response);
        this.emailService.send_email_register_patient(data_familiar).subscribe({
          next: (response) => {
            console.log(response);
          }
        });
      }
    });
    
  }

  buildForm() {
    this.form_patient = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', Validators.required],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      CC: ['', [Validators.required]],
      description: [''],
      gender: ['M', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.form_familiar = this.formBuilder.group({
      familiar_name: ['', [Validators.required]],
      familiar_lastname: ['', Validators.required],
      familiar_email: ['', [Validators.required, Validators.email]],
      familiar_phone: ['', [Validators.required]]
    })
  }

  get fg_familiar() {
    return this.form_familiar.controls;
  }

  get fg_patient() {
    return this.form_patient.controls;
  }

  togglePasswordVisibility() {
    this.show_password = !this.show_password;

  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image_file = event.target.files[0];
      console.log(this.image_file);
      this.selected_file = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image_url_not_upload = e.target.result;
      };
      reader.readAsDataURL(this.image_file as File);
    }
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
