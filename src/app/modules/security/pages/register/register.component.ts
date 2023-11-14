import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientRegister } from 'src/app/models/patient.model';
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
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private modalService: ModalService,
    private router: Router
    ) { 
    
    this.builForm();
  }


  register() {
    if(this.form_patient.valid && this.form_familiar.valid) {
      let data: PatientRegister = {
        name: this.form_patient.value.name,
        lastname: this.form_patient.value.lastname,
        phone: this.form_patient.value.phone,
        email: this.form_patient.value.email,
        cc: this.form_patient.value.CC,
        password: this.form_patient.value.password,
        gender: this.form_patient.value.gender,
        image_url: '',
        birthdate: this.form_patient.value.birthdate,
        address: this.form_patient.value.address,
        description: this.form_patient.value.description,
        familiar_name: this.form_familiar.value.familiar_name,
        familiar_lastname: this.form_familiar.value.familiar_lastname,
        familiar_email: this.form_familiar.value.familiar_email,
        familiar_phone: this.form_familiar.value.familiar_phone,
      }

      console.log(data);
      
      this.patientService.register_patient(data).subscribe({
        next: (response) => {
          if(response) {
            this.modalService.openModalConfirmationAction();
            this.router.navigate(['/login']);
            console.log(response);
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
      
    }
  }


  builForm() {
    this.form_patient = this.formBuilder.group({
      name: ['Juan', [Validators.required]],
      lastname: ['Zapata', Validators.required],
      phone: ['3104572663', [Validators.required]],
      address: ['Cra 8c#41-19', [Validators.required]],
      CC: ['1002633638', [Validators.required]],
      description: ['Me gusta el pipi', [Validators.required]],
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
}
