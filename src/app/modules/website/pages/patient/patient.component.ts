import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientCard } from 'src/app/models/patient.model';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { StorageService } from 'src/app/services/storage.service';
import { VitalSingsService } from 'src/app/services/vital.sings.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent {
  patients: PatientCard[] = [];
  doctor: UserGetWithMenusModel | null = null;
  doctorId: number = 0;
  value_o2_saturation: number | undefined = 0;
  value_blood_presure: number | undefined = 0;
  value_heart_rate: number | undefined = 0;
  showDescription: boolean[] = new Array(this.patients.length).fill(false)

  constructor(
    private patientService: PatientService,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private doctorService: DoctorService,
    private vitalSingsService: VitalSingsService
  ) {}

  ngOnInit() {
    this.getDoctorLogged();
  }

  getAllPatients(doctorId: number) {
    this.patientService.getPatientsByDoctorId(this.doctorId).subscribe(
      (response) => {
        if (response && response.data) {
          this.patients = response.data;
          //this.updateStatusPatient();
        }
      },
      (error) => {
        console.error('Error al obtener los pacientes:', error);
      }
    );
  }

  // En espera de optimización
  updateStatusPatient() {
    console.log('Entró al método updateStatusPatient');
    this.patients.forEach((patient) => {
      this.vitalSingsService
        .getLastVitalSigns(patient.patient_id)
        .subscribe(
          (response) => {            
            if (response && response.data) {
              console.log('Entró al if de updateStatusPatient')
              let vitalSings =
                this.vitalSingsService.convertVitalSingsToVitalSignsHistory(
                  response.data
                );
              patient.status = this.vitalSingsService.calculateStatusPatientByVitalSigns(vitalSings);
              console.log('PATIENTS', this.patients);
            }
          },
          (error) => {
            console.error('Error al obtener los signos vitales:', error);
          }
        );
    });
  }

  redirectToDashboard(patientId: number) {
    this.router.navigate(['/website/dashboard', patientId]);
  }
   
  toggleDescription(index: number): void {
    this.showDescription[index] = !this.showDescription[index];
  }

  getDoctorLogged() {
    var userId = this.storageService.getUserId();
    console.log('USER ID', userId);
    this.doctorService.getDoctorByUserId(userId).subscribe((response) => {
      console.log('RESPONSE', response);
      if (response && response.data) {
        this.doctorId = response.data.id;
        this.getAllPatients(this.doctorId);        
      }
    });
  }
}
