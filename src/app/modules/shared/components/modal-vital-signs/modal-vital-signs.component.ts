import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutCustomModal } from 'src/app/models/out.custom.model';
import { VitalSingsModel } from 'src/app/models/vital.sings.model';
import { ModalService } from 'src/app/services/modal.service';
import { VitalSingsService } from 'src/app/services/vital.sings.service';

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
export class ModalVitalSignsComponent implements OnInit {
  title: string
  patient_id: number
  iconClass: string;
  form: FormGroup = new FormGroup({});
  disabled: boolean = false;
  max: number = 100;
  min: number = 0;
  showTicks: boolean = false;
  step: number = 1;
  thumbLabel: boolean = false;
  vitalSignsId: number | undefined = 0;
  value_o2_saturation;
  value_blood_presure;
  value_heart_rate;
  constructor(
    private modalService: ModalService,
    private vitalSingsService: VitalSingsService,
    private dialog: DialogRef<OutCustomModal, OutCustomModal>,
    @Inject(DIALOG_DATA) private data: InputDataModel,
  ) {
    this.title = data.title;
    this.patient_id = data.pacientId;
    this.iconClass = data.iconClass || 'fa fa-solid fa-user';
    this.value_o2_saturation = 0;
    this.value_blood_presure = 0;
    this.value_heart_rate = 0;

    this.modalService.closeModalEvent.subscribe(() => {
      this.close();
    });

  }
  ngOnInit(){
    this.getVitalSigns();
  }

  updateVitalSigns() {
    const vitalSigns:VitalSingsModel = {
      id: this.vitalSignsId ,
      hearth_rate: this.value_heart_rate,
      blood_pressure: this.value_blood_presure,
      O2_saturation: this.value_o2_saturation,
      patient_id: this.patient_id
    };
    console.log("Enviar a actualizar al socket", vitalSigns);
    this.vitalSingsService.updateVitalSings(vitalSigns);
    this.close();
  }

  getVitalSigns() {
    this.vitalSingsService.getLastVitalSigns(this.patient_id).subscribe((response) => {
      this.value_heart_rate = response.data.hearth_rate;
      this.value_blood_presure = response.data.blood_pressure;
      this.value_o2_saturation = response.data.O2_saturation;
    });
  }

  close(){
    this.dialog.close();
  }


}
