import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages } from 'src/app/common/messages.const';
import { FileModel } from 'src/app/models/file.model';
import { PatientRegister } from 'src/app/models/patient.model';
import { FileService } from 'src/app/services/file.service';
import { ModalService } from 'src/app/services/modal.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form_patient: FormGroup = new FormGroup('');
  form_familiar: FormGroup = new FormGroup('');
  patient: PatientRegister | null = null;
  image_file!: File | null;
  showPassword: boolean = false;
  selected_file: boolean = false;
  url_image: string = '';
  imageUrlNotUpload: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private modalService: ModalService,
    private router: Router
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

    console.log(user);
    formData.append('user', JSON.stringify(user));

    console.log(formData.get('user'));

    if(this.selected_file){
      formData.append('image_file', this.image_file as File);
    }

    console.log(JSON.stringify(user));

    this.patientService.register_patient(formData).subscribe({
      next: (response) => {
        if(response) {
          this.modalService.openToastSuccessAction(Messages.SuccessRegister);
          this.router.navigate(['/login']);
          console.log(response);
        }
      },
      error: (error) => {
        console.log(error);
        if (error.status == 500) {
          this.modalService.openToastErrorAction(Messages.ErrorRegister);
        }
      }
    })
  }

  buildForm() {
    this.form_patient = this.formBuilder.group({
      name: ['Juan', [Validators.required]],
      lastname: ['Zapata', Validators.required],
      phone: ['3104572663', [Validators.required]],
      address: ['Cra 8c#41-19', [Validators.required]],
      CC: ['1002633638', [Validators.required]],
      description: ['Me gusta el pipi'],
      gender: ['M', [Validators.required]],
      birthdate: ['2002-05-16', [Validators.required]],
      email: ['juanzapata_12@gmail.com', [Validators.required, Validators.email]],
      password: ['Hola123*', Validators.required]
    })

    this.form_familiar = this.formBuilder.group({
      familiar_name: ['Juliana', [Validators.required]],
      familiar_lastname: ['Gómez', Validators.required],
      familiar_email: ['julianza@gmail.com', [Validators.required, Validators.email]],
      familiar_phone: ['3136824950', [Validators.required]]
    })
  }

  get fg_familiar() {
    return this.form_familiar.controls;
  }

  get fg_patient() {
    return this.form_patient.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;

  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image_file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrlNotUpload = e.target.result;
      };
      reader.readAsDataURL(this.image_file as File);
    }
  }
}
