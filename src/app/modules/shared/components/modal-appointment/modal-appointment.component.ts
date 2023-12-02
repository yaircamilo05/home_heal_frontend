import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component,Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentCreateModel } from 'src/app/models/appointments.create.model';
import { OutCustomModal } from 'src/app/models/out.custom.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { ModalService } from 'src/app/services/modal.service';
import { StorageService } from 'src/app/services/storage.service';

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
  
  constructor
  (
    private modalService: ModalService,
    private dialog: DialogRef<OutCustomModal,OutCustomModal>,
    @Inject(DIALOG_DATA) private data: InputDataModel,
    private fb : FormBuilder,
    private appointmentService: AppointmentsService,
    private strorageService: StorageService
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
    let appointment_data: AppointmentCreateModel = {
      reason: this.reason,
      date: this.form.value.date,
      hour: this.form.value.hour,
      speciality: this.form.value.speciality,
      user_id: this.strorageService.getUserId()
    }

    console.log(appointment_data);
    
  }

  getHours(){
    this.appointmentService.getAvailableHoursByDate(this.form.value.date).subscribe(
      (response) => {
        this.hours = response.data;        
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
      hour: ['',Validators.required]
    })};

  close(){
    this.dialog.close();
  }
  
  getSymptomValue(value: string | undefined){
    this.cont++;
    this.reason += this.cont > 1 ? ', ' + value : value;
  }
}
