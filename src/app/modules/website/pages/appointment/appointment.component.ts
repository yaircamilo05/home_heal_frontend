import { Dialog } from '@angular/cdk/dialog'
import { Component } from '@angular/core'
import { Icons } from 'src/app/common/icon.modal'
import { Messages } from 'src/app/common/messages.const'
import { TitlesModal } from 'src/app/common/titles.modal'
import { TypeModal } from 'src/app/common/type.modal'
import { AppointmentGetModel } from 'src/app/models/appointment.model'
import { EmailCancellationModel } from 'src/app/models/email.cancellation.model'
import { ModalAppointmentComponent } from 'src/app/modules/shared/components/modal-appointment/modal-appointment.component'
import { AppointmentsService } from 'src/app/services/appointments.service'
import { EmailService } from 'src/app/services/email.service'
import { ModalService } from 'src/app/services/modal.service'
import { StorageService } from 'src/app/services/storage.service'
import { environment } from 'src/environments/environment.local'

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent {
  appointments: AppointmentGetModel[] = []
  userRolId: number = 0

  searchText: string = ''
  limit: number | undefined = 10
  appState: string = ''
  startingDate: string = ''
  // endingDate: string = ''

  constructor(
    private appointmentsService: AppointmentsService,
    private storageService: StorageService,
    private modalService: ModalService,
    private emailService: EmailService,
    private dialog: Dialog,
  ) { }

  ngOnInit(): void {
    this.getAppointmentsByUser()
    this.getRolId()
  }

  clearFilter() {
    this.searchText = ''
    this.appState = ''
    this.startingDate = ''
    // this.endingDate = ''
    this.limit = undefined
  }

  getAppointmentsByUser() {
    this.appointmentsService.getAppointmentsByUser().subscribe(
      (response) => {
        // Verifica si obtienes los datos correctamente
        console.log(response)
        if (response && response.data) {
          this.appointments = response.data
        }
      },
      (error) => {
        console.error('Error al obtener las citas:', error)
      }
    )
  }

  getRolId() {
    this.userRolId = this.storageService.getRolId()
    console.log('rol id = ' + this.userRolId)
  }

  async openModalCancelAppointment(appointment: AppointmentGetModel) {

    const appointmentDate = new Date(appointment.date);
    if (appointmentDate < new Date()) {
      this.modalService.openToastErrorAction(Messages.ErrorCancelAppointment);
    }
    else {
      var deleted = await this.modalService.openModalConfirmation(
        Messages.CancelAppointment
      );
      if (deleted.isConfirmed) {
        this.appointmentsService.cancelAppointment(appointment).subscribe(
          (response) => {
            // Verifica si obtienes los datos correctamente
            console.log(response);
            if (response && response.data) {
              this.modalService.openModalConfirmationAction();
              this.getAppointmentsByUser();
              this.send_email(appointment);
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
      this.modalService.openToastErrorAction(Messages.ErrorCheckAppointment);
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
          this.modalService.openToastErrorAction(Messages.ErrorCheckAppointment);

        }
      );
    }
  }

  send_email(appointment: AppointmentGetModel){
    let to_destination: string = this.userRolId == 2 ? appointment.doctor_email : appointment.patient_email;
    let name: string = this.userRolId == 2 ? appointment.doctor_name : appointment.patient_name;

    let data: EmailCancellationModel = {
      hash: environment.hash_validator,
      to_destination: to_destination,
      name: name,
      date: appointment.date.toString()
    }

    this.emailService.send_email_appointment_cancellation(data).subscribe({
      next: (response) => {
        if (response) {
          console.log('email enviado');
          let message = this.userRolId == 2 ? 'doctor' : 'paciente';
          this.modalService.openToastWelcome(Messages.EmailSent(message));
        }
      },
      error: (err) => {
        console.log('error al enviar email');
      }
    });
  }

  deshabilitarBoton(appointment: AppointmentGetModel) {
    if (appointment.state != 'PENDIENTE') {
      return false;
    } else {
      return true;
    }
  }
  openModalAppointment() {
    console.log("entre");
    
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

    console.log(RefDialog);
    
  }
}
