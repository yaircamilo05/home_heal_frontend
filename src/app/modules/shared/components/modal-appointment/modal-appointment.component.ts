import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component,Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { co } from '@fullcalendar/core/internal-common';
import { Messages } from 'src/app/common/messages.const';
import { AppointmentCreateModel } from 'src/app/models/appointments.create.model';
import { DoctorAppointmentModel } from 'src/app/models/doctor.appointment.model';
import { EmailAppointmentModel } from 'src/app/models/email.appointment.model';
import { OutCustomModal } from 'src/app/models/out.custom.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { EmailService } from 'src/app/services/email.service';
import { ModalService } from 'src/app/services/modal.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment.local';

interface InputDataModel{
  title: string,
  question: string,
  iconClass?: string,
  type?: string
}

@Component({
  selector: 'app-modal-appointment',
  templateUrl: './modal-appointment.component.html',
  styleUrls: ['./modal-appointment.component.scss']
})
export class ModalAppointmentComponent {
  
  iconsData = [
    { class: 'fa-head-side-cough', text: 'Otorrino', value: '1' },
    { class: 'fa-heart-pulse', text: 'Cardiovascular', value: '2' },
    { class: 'fa-bone', text: 'Lesión', value: '3' },
    { class: 'fa-poop', text: 'Digestión', value: '4' },
    { class: 'fa-lungs', text: 'Respiratorio', value: '5' },
    { class: 'fa-face-grin-hearts', text: 'Salud sexual', value: '6' },
    { class: 'fa-venus', text: 'Ginecología', value: '7' },
    { class: 'fa-toilet', text: 'Urología', value: '8' },
    { class: 'fa-house-chimney-medical', text: 'Control', value: '9' }
  ];

  title: string;
  question: string;
  iconClass: string | undefined = 'fa-solid fa-user';
  type:string | undefined = 'Confirmation';
  form: FormGroup = new FormGroup({});
  hours: string[] = [];
  reason: string = '';  
  cont: number = 0;
  doctors: any[] = [];
  doctor: any;
  isAcceptClicked = false;
  selectedIcons : string[] = [];
  
  constructor
  (
    private modalService: ModalService,
    private dialog: DialogRef<OutCustomModal,OutCustomModal>,
    @Inject(DIALOG_DATA) private data: InputDataModel,
    private fb : FormBuilder,
    private appointmentService: AppointmentsService,
    private strorageService: StorageService,
    private doctorService: DoctorService,
    private emailService: EmailService
    )
  {
    this.title = data.title;
    this.question = data.question;
    this.iconClass = data.iconClass;
    this.type = data.type;
    this.buildForm();
    
    this.modalService.closeModalEvent.subscribe(() => {
      this.close();
    });
  }

  createAppointment(){
    this.isAcceptClicked = true;
    let appointment_data: AppointmentCreateModel = {
      reason: this.reason,
      date: this.form.value.date,
      hour: this.form.value.hour,
      doctor_id: this.form.value.doctor,
      user_id: this.strorageService.getUserId()
    }

    this.appointmentService.postAppointment(appointment_data).subscribe({
      next: (response) => {
        console.log(response);
        this.close();
        window.location.reload();
        this.send_email(response.data.data_patient);
        this.modalService.openToastWelcome(Messages.SuccessAppointment)


      },
      error: (error) => {
        console.log(error);
        this.modalService.openToastErrorAction(Messages.ErrorAction);
      }
    });
  }

  send_email(patient: any){
    this.doctorService.getDoctorById(this.form.value.doctor).subscribe({
      next: (response) => {
        this.doctor = response.data;
        
        let email_data: EmailAppointmentModel = {
          hash: environment.hash_validator,
          to_destination: [this.doctor.email, patient.email],
          name: 'tú',
          text: 'Tienes una nueva cita programada',
          date: this.form.value.date + ' ' + this.form.value.hour,
          address: patient.address,
          reason: this.reason,
          name_patient: patient.full_name,
          cc_patient: patient.cc,
          phone_patient: patient.phone,
          email_patient: patient.email,
          name_doctor: this.doctor.full_name,
          cc_doctor: this.doctor.cc,
          phone_doctor: this.doctor.phone,
          email_doctor: this.doctor.email,
          problem: 'llevar a cabo la cita',
          relationship: ''
        }
    
        console.log("email: "+email_data);
    
        this.emailService.send_email_appointment(email_data).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          }
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
    
  }

  getHours(){
    this.appointmentService.getAvailableHoursByDate(this.form.value.date, this.form.value.doctor).subscribe(
      (response) => {
        this.hours = response.data;        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDoctors(){
    this.doctorService.getDoctorsBySpecialty(this.form.value.speciality).subscribe(
      (response) => {
        this.doctors = response.data;
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buildForm(){
    this.form = this.fb.group({
      date: ['',Validators.required],
      speciality: ['',Validators.required],
      hour: ['',Validators.required],
      doctor: ['',Validators.required]
    })};

  close(){
    this.dialog.close();
  }
  
  getSymptomValue(value: string){
    const index = this.selectedIcons.indexOf(value);
    if (index > -1) {
    // Si el icono ya está seleccionado, quítalo del array
    this.selectedIcons.splice(index, 1);
   } else {
    // Si el icono no está seleccionado, añádelo al array
    this.selectedIcons.push(value);
  }
    this.reason = this.selectedIcons.join(',');
    console.log(this.reason);
  }
}
