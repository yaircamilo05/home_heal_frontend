import { Component } from '@angular/core'
import { AppointmentGetModel } from 'src/app/models/appointment.model'
import { AppointmentsService } from 'src/app/services/appointments.service'
import { StorageService } from 'src/app/services/storage.service'

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
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
    private storageService: StorageService
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
}
