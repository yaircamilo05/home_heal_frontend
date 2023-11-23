import { Component } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  patients: any[] = [];
  patient_user: any = {};
  age: number = 0;

  constructor(
    private patientService: PatientService,
  ) {}
  
  ngOnInit() {
    this.getAllPatients();
  }

  getAllPatients() {
    this.patientService.getPatients().subscribe(
      (response) => {
        // Verifica si obtienes los datos correctamente
        console.log(response);
        if (response && response.data) {
          this.patients = response.data;
          this.calculateAges();
        }
      },
      (error) => {
        console.error('Error al obtener los pacientes:', error);
      }
    );
  }

  /**
   * En espera del get_user por 'id' para la implementación
   */
  getPatientUser() {
  }

  /**
   * Calculate the patient's age to make it easier to visualize.
   */
  calculateAges() {
    this.patients.forEach((patient) => {
      patient.birthdate = this.patientService.calculateAge(new Date(patient.birthdate));
    });
  }
}
