import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component,Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutCustomModal } from 'src/app/models/out.custom.model';
import { ModalService } from 'src/app/services/modal.service';

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
  
  constructor
  (
    private modalService: ModalService,
    private dialog: DialogRef<OutCustomModal,OutCustomModal>,
    @Inject(DIALOG_DATA) private data: InputDataModel,
    private fb : FormBuilder
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

  
  buildForm(){
    this.form = this.fb.group({
      rol_id: [0,Validators.required],
      menu_id: [0,Validators.required],
    })};

  close(){
    this.dialog.close();
  }
  
  getSymptomValue(value: string | undefined){
    console.log(value);
  }

}
