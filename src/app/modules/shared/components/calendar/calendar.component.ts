import { Component,OnInit } from '@angular/core';
import { CalendarOptions, EventInput, EventSourceInput } from '@fullcalendar/core';
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
      this.events = response!.data.map((appointment) => {
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
      eventClick: function (info) {
        alert('Evento seleccionado: ' + info.event.title);
      },
      locale: 'es',
    };
  }
}