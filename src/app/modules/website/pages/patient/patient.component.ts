import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { PatientCard } from 'src/app/models/patient.model'
import { UserGetWithMenusModel } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth.service'
import { DoctorService } from 'src/app/services/doctor.service'
import { PatientService } from 'src/app/services/patient.service'
import { StorageService } from 'src/app/services/storage.service'
import { ModalCaresComponent } from 'src/app/modules/shared/components/modal-cares/modal-cares.component';
import { ModalDiagnosticComponent } from 'src/app/modules/shared/components/modal-diagnostic/modal-diagnostic.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patients: PatientCard[] = []
  doctor: UserGetWithMenusModel | null = null
  doctorId: number = 0

  searchText: string = ''
  limit: number | undefined = 10

  constructor(
    private patientService: PatientService,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private doctorService: DoctorService,
    private dialog: Dialog
  ) { }

  ngOnInit() {
    this.getDoctorLogged()
  }

  clearFilter() {
    this.searchText = '';
    this.limit = undefined;
  }

  getAllPatients(doctorId: number) {
    this.patientService.getPatientsByDoctorId(this.doctorId).subscribe(
      (response) => {
        console.log(response)
        if (response && response.data) {
          this.patients = response.data
        }
      },
      (error) => {
        console.error('Error al obtener los pacientes:', error)
      }
    )
  }

  redirectToDashboard(patientId: number) {
    this.router.navigate(['/website/dashboard', patientId])
  }

  getDoctorLogged() {
    var userId = this.storageService.getUserId()
    this.doctorService.getDoctorByUserId(userId).subscribe(response => {
      if (response && response.data) {
        this.doctorId = response.data.id
        console.log(
          "USER ID", userId,
          "DOCTOR ID", this.doctorId,
          "RESPONSE", response
        )
        this.getAllPatients(this.doctorId)
      }
    })
  }

  openCaresModal(patientId: number) {
    this.dialog.open(ModalCaresComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        patientId: patientId
      }
    })
  }

  openDiagnosesModal(patientId: number) {
    this.dialog.open(ModalDiagnosticComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        patientId: patientId
      }
    })
  }

}
