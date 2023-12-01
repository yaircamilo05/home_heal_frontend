import { Component } from '@angular/core';
import { Messages } from 'src/app/common/messages.const';
import { AppointmentGetModel } from 'src/app/models/appointment.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { ModalService } from 'src/app/services/modal.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent {
  appointments: AppointmentGetModel[] = [];
  userRolId: number = 0;

  constructor(
    private appointmentsService: AppointmentsService,
    private storageService: StorageService,
    private modalService: ModalService
  ) {}

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

  getRolId() {
    this.userRolId = this.storageService.getRolId();
    console.log('rol id = ' + this.userRolId);
  }

  async openModalCancelAppointment(appointment: AppointmentGetModel) {

    const appointmentDate = new Date(appointment.date);
    if (appointmentDate < new Date()) {
      //aqui podria ir el toast del error
    }
    else{
    var deleted = await this.modalService.openModalConfirmation(
      Messages.CancelAppointment
    );
    if (deleted.isConfirmed) {
      this.appointmentsService.cancelAppointment(appointment).subscribe(
        (response) => {
          // Verifica si obtienes los datos correctamente
          console.log(response);
          if (response && response.data) {
            console.log(
              'los correos de los involucrados son:',
              appointment.doctor_email + ' ' + appointment.patient_email
            );
            this.modalService.openModalConfirmationAction();
            this.getAppointmentsByUser();
          }
        },
        (error) => {
          console.error('Error al obtener las citas:', error);
        }
      );
  }
}

  }

  marcarCitaRealizada(appointment: AppointmentGetModel) {

    if (appointment.date > new Date()) {
      //aqui podria ir el toast del error
    } else {
    this.appointmentsService.markAppointmentAsDone(appointment).subscribe(
      (response) => {
        // Verifica si obtienes los datos correctamente
        console.log(response);
        if (response && response.data) {
          console.log(
            'los correos de los involucrados son:',
            appointment.doctor_email + ' ' + appointment.patient_email
          );
          this.modalService.openModalConfirmationAction();
          this.getAppointmentsByUser();
        }
      },
      (error) => {
        console.error('Error al obtener las citas:', error);
      }
    );
  }
}

  deshabilitarBoton(appointment: AppointmentGetModel) {
    if (appointment.state != 'Pendiente') {
      return false;
    } else {
      return true;
    }
  }
}
