import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Icons } from 'src/app/common/icon.modal';
import { TitlesModal } from 'src/app/common/titles.modal';
import { TypeModal } from 'src/app/common/type.modal';
import { AppointmentGetModel } from 'src/app/models/appointment.model';
import { ModalAppointmentComponent } from 'src/app/modules/shared/components/modal-appointment/modal-appointment.component';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  appointments: AppointmentGetModel[] = [];
  userRolId: number = 0;


  constructor(
    private appointmentsService: AppointmentsService,
    private storageService: StorageService,
    private dialog: Dialog,
  ) { }

  ngOnInit(): void {
    this.getAppointmentsByUser();    
    this.getRolId();
  }

  getAppointmentsByUser() {
    this.appointmentsService.getAppointmentsByUser().subscribe(
      (response) => {
        // Verifica si obtienes los datos correctamente
        console.log(response);
        if (response && response.data) {
          this.appointments = response.data;
        }
      },
      (error) => {
        console.error('Error al obtener las citas:', error);
      }
    );
  }

  getRolId(){
    this.userRolId = this.storageService.getRolId();
    console.log('rol id = ' + this.userRolId);
  }

  openModalAppointment() {
    let RefDialog = this.dialog.open(ModalAppointmentComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: TitlesModal.Module,
        question: '',
        iconClass: Icons.Module,
        type: TypeModal.Module,
        imageUser: '',
        userName: ''
      }
    });
  }
}
