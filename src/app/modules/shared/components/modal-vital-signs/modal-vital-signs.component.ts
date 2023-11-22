import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutCustomModal } from 'src/app/models/out.custom.model';
import { VitalSingsModel } from 'src/app/models/vital.sings.model';
import { ModalService } from 'src/app/services/modal.service';

interface InputDataModel {
  title: string,
  pacientId: number,
  iconClass?: string,
}
@Component({
  selector: 'app-modal-vital-signs',
  templateUrl: './modal-vital-signs.component.html',
  styleUrls: ['./modal-vital-signs.component.scss']
})
export class ModalVitalSignsComponent {
  title: string
  pacienteId: number
  iconClass: string;
  form: FormGroup = new FormGroup({});
  disabled: boolean = false;
  max: number = 100;
  min: number = 0;
  showTicks: boolean = false;
  step: number = 1;
  thumbLabel: boolean = false;
  value_o2_saturation;
  value_blood_presure;
  value_heart_rate;
  constructor(
    private modalService: ModalService,
    private dialog: DialogRef<OutCustomModal, OutCustomModal>,
    @Inject(DIALOG_DATA) private data: InputDataModel,
    private fb: FormBuilder,
  ) {
    this.title = data.title;
    this.pacienteId = data.pacientId;
    this.iconClass = data.iconClass || 'fa fa-solid fa-user';
    this.value_o2_saturation = 0;
    this.value_blood_presure = 0;
    this.value_heart_rate = 0;

  }

  updateVitalSigns() {
    const vitalSigns:VitalSingsModel = {
      heart_rate: this.value_heart_rate,
      blood_pressure: this.value_blood_presure,
      O2_saturation: this.value_o2_saturation
    };
    vitalSigns.id = this.pacienteId;
    console.log("Enviar a actualizar al socket", vitalSigns);
  }




}
