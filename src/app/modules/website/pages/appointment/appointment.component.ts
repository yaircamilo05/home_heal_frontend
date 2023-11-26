import { Component } from '@angular/core';
import { AppointmentGetModel } from 'src/app/models/appointment.model';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  appointments: AppointmentGetModel[] = [];



  constructor(
    private appointmentsService: AppointmentsService
  ) { }

  ngOnInit(): void {
    this.getAppointmentsByUser();    
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
}