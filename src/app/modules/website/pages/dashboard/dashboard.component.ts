import { Component } from '@angular/core';
import { VitalSingsService } from './../../../../services/vital-sings.service';
import { VitalSingsModel } from 'src/app/models/vital.sings.model';
import { ModalVitalSignsComponent } from 'src/app/modules/shared/components/modal-vital-signs/modal-vital-signs.component';
import { Dialog } from '@angular/cdk/dialog';
import { TitlesModal } from 'src/app/common/titles.modal';
import { Icons } from 'src/app/common/icon.modal';
import { TypeModal } from 'src/app/common/type.modal';
import { UserGetModel } from './../../../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    public vitalSingsService: VitalSingsService,
    private dialog: Dialog
  ) {

  }
  saveVitalsSings() {
    // const vitalSings: VitalSingsModel = {
    //   heart_rate: 100,
    //   blood_pressure: 100,
    //   O2_saturation: 100
    // }
    // this.vitalSingsService.sendVitalSings(vitalSings);
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
        pacientId: 1
      }
    });
  }

}
