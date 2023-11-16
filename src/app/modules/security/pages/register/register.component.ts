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
  image_file: File | null = null;
  showPassword: boolean = false;
  selected_file: boolean = false;
  url_image: string = '';

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
    formData.append('name', this.form_patient.value.name);
    formData.append('lastname', this.form_patient.value.lastname);
    formData.append('phone', this.form_patient.value.phone);
    formData.append('email', this.form_patient.value.email);
    formData.append('cc', this.form_patient.value.CC);
    formData.append('password', this.form_patient.value.password);
    formData.append('birthdate', this.form_patient.value.birthdate);
    formData.append('address', this.form_patient.value.address);
    formData.append('description', this.form_patient.value.description);
    formData.append('gender', this.form_patient.value.gender);

    if(this.selected_file){
      console.log('entre');
      
      formData.append('image_file', this.image_file as File);
    }

    formData.append('familiar_name', this.form_familiar.value.familiar_name);
    formData.append('familiar_lastname', this.form_familiar.value.familiar_lastname);
    formData.append('familiar_email', this.form_familiar.value.familiar_email);
    formData.append('familiar_phone', this.form_familiar.value.familiar_phone);

    console.log(formData.get('image_file'));
    
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

  onFileSelected(event: any){
    this.image_file = event.target.files[0] as File;
    this.selected_file = true;
    console.log(this.image_file);
    // this.form_patient.patchValue({
    //   image_file: this.image_file
    // })
  }
}
