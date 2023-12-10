import { Component,OnInit } from '@angular/core';
import { CalendarOptions, EventInput, EventSourceInput } from '@fullcalendar/core';
import { DayCellContainer } from '@fullcalendar/core/internal';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AppointmentsService } from 'src/app/services/appointments.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  events: EventInput[] = [];
  calendarOptions!: CalendarOptions;

  constructor(private appointmentService: AppointmentsService) {}

  ngOnInit() {
    this.initializeCalendarOptions();
    this.getAppointments();
  }

  async getAppointments() {
    try {
      const response = await this.appointmentService.getAppointmentsByUser().toPromise();
      console.log(response);
      const pendingAppointments = response!.data.filter(appointment => appointment.state === 'PENDIENTE');
      this.events = pendingAppointments.map((appointment) => {
        return {
          date: appointment.date,
          title: "Cita con " + appointment.patient_name,
        };
      });
      this.calendarOptions.events = this.events;
    } catch (error) {
      console.log(error);
    }
  }

  initializeCalendarOptions() {
    console.log(this.events);
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],
      locale: 'es',
      eventColor: '#D80A0A',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth',
      },
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
      },
    };
    
  }


}