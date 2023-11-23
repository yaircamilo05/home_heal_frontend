import { Component, OnInit } from '@angular/core';
import { VitalSingsService } from '../../../../services/vital.sings.service';
import { VitalSingsModel } from 'src/app/models/vital.sings.model';
import { ModalVitalSignsComponent } from 'src/app/modules/shared/components/modal-vital-signs/modal-vital-signs.component';
import { Dialog } from '@angular/cdk/dialog';
import { TitlesModal } from 'src/app/common/titles.modal';
import { Icons } from 'src/app/common/icon.modal';
import { TypeModal } from 'src/app/common/type.modal';
import { UserGetModel } from './../../../../models/user.model';
import { VitalSignsHistoryModel } from 'src/app/models/vital.signs.history';
import { SockectioService } from './../../../../services/sockectio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public vitalSings: VitalSignsHistoryModel = {
    hearth_rate: 0,
    blood_pressure: 0,
    O2_saturation: 0,
    date: new Date().toLocaleString("es-CO", {timeZone: "America/Bogota"}),
    patient_id: 0,
  };


  constructor(
    public vitalSingsService: VitalSingsService,
    private dialog: Dialog
  ) {
    this.onUpdateVitalSigns();
  }
  ngOnInit(){
    this.onUpdateVitalSigns();
    this.getVitalSignsHistory();
  }

  onUpdateVitalSigns() {
    console.log("escuchando en tiempo real")
    this.vitalSingsService.socketService.io.on('update vital Signs', (response: VitalSignsHistoryModel)=>{
      console.log("Respuesta en tiempo real servidor EN DASHBOARD",response);
      const vitalRealTime:VitalSignsHistoryModel = {
        hearth_rate: response.hearth_rate,
        blood_pressure: response.blood_pressure,
        O2_saturation: response.O2_saturation,
        date: response.date,
        patient_id: response.patient_id,
      };

      this.vitalSings = vitalRealTime;
      console.log("EL REAL EN DASHBOARD", this.vitalSingsService.vistalsSigns);
    });
  }
  openModalUpdateVitalsSigns() {
    let RefDialog = this.dialog.open(ModalVitalSignsComponent,
    {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: TitlesModal.vitalSigns('Nombre del paciente'),
        iconClass: Icons.vitalSigns,
        pacientId: 12
      }
    });
  }

  getVitalSignsHistory() {
    this.vitalSingsService.getVitalSignsHistory(12).subscribe((response) => {
      this.vitalSingsService.vistalsSigns = response.data;
      this.vitalSings =  this.vitalSingsService.vistalsSigns[ this.vitalSingsService.vistalsSigns.length - 1];
    });
  }
}
