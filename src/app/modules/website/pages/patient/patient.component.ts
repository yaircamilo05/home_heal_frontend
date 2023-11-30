import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientCard } from 'src/app/models/patient.model';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  patients: PatientCard[] = [];
  doctor: UserGetWithMenusModel | null = null;
  doctorId: number = 0;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private doctorService:DoctorService
  ) {}

  ngOnInit() {
    this.getDoctorLogged();
  }

  getAllPatients(doctorId:number) {
    this.patientService.getPatientsByDoctorId(this.doctorId).subscribe(
      (response) => {
        console.log(response);
        if (response && response.data) {
          this.patients = response.data;
        }
      },
      (error) => {
        console.error('Error al obtener los pacientes:', error);
      }
    );
  }

  redirectToDashboard(patientId: number) {
    this.router.navigate(['/website/dashboard', patientId]);
  }

  getDoctorLogged(){
    var userId = this.storageService.getUserId();
    console.log("USER ID", userId);
    this.doctorService.getDoctorByUserId(userId).subscribe( response => {
      console.log("RESPONSE", response);
      if(response && response.data){
        this.doctorId = response.data.id;
        console.log("DOCTOR ID", this.doctorId);
        this.getAllPatients(this.doctorId);
      }
    });
  }

}

