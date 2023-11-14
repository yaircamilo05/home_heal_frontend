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
  image_url: File | null = null;
  showPassword: boolean = false;
  selected_file: boolean = false;
  url_image: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private modalService: ModalService,
    private fileService: FileService,
    private router: Router
    ) { 
    
    this.builForm();
  }


  register() {
      if(this.form_patient.valid && this.form_familiar.valid) {
        if(this.selected_file){
          let file: FileModel = {
            name: 'file',
            file: this.image_url as File,
            fileName: this.image_url?.name as string
          }
          this.fileService.upload_file(file).subscribe({
            next: (response) => {
              if(response) {
                console.log(response);
                this.url_image = response.toString();
                this.register_patient();
              }
            },
            error: (error) => {
              console.log(error);
              this.modalService.openToastErrorAction(Messages.ImageError);
            }
          })
        }else{
          this.register_patient();
        }
    }
  }

  register_patient(){
    let data: PatientRegister = {
      name: this.form_patient.value.name,
      lastname: this.form_patient.value.lastname,
      phone: this.form_patient.value.phone,
      email: this.form_patient.value.email,
      cc: this.form_patient.value.CC,
      password: this.form_patient.value.password,
      gender: this.form_patient.value.gender,
      image_url: this.url_image,
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

  builForm() {
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
      password: ['Hola123*', Validators.required],
      image_url: ['']
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
    this.image_url = event.target.files[0] as File;
    this.selected_file = true;
    console.log(this.image_url);
  }
}
