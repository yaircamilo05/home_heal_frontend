import { OnInit } from '@angular/core';
import { DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { DialogData } from '../modal-cares/modal-cares.component';
import { ModalService } from 'src/app/services/modal.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { HealthyService } from 'src/app/services/healthy.service';
import { CaresCreateModel, GeneratedCare } from 'src/app/models/cares.model';
import { BehaviorSubject } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { CaresService } from 'src/app/services/cares.service';

@Component({
  selector: 'app-modal-generative-cares',
  templateUrl: './modal-generative-cares.component.html',
  styleUrls: ['./modal-generative-cares.component.scss']
})
export class ModalGenerativeCaresComponent implements OnInit {

  patientCares: GeneratedCare[] = []
  patientId: number = 0

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(
    private storageService: StorageService,
    @Inject(DIALOG_DATA) private data: DialogData,
    private modalService: ModalService,
    private doctorService: DoctorService,
    private healthyService: HealthyService,
    private caresService: CaresService,
    private dialog: Dialog,
  ) {
    this.patientId = data.patientId
    this.modalService.closeModalEvent.subscribe(() => {
      this.close()
    })
  }
  close() {
    this.dialog.closeAll()
  }

  ngOnInit(): void {
    this.regenerateCares()
  }

  getRole() {
    return this.storageService.getRolId();
  }

  regenerateCares() {
    this.patientCares = []
    let user_id: number = this.storageService.getUserId();
    this.healthyService.generateCares(this.patientId, user_id).subscribe(
      (response) => {
        if (response && response.data) {
          this.healthyService.updateCares(response.data)
          this.patientCares = response.data
        }
      },
      (error) => {
        console.error('Error al obtener los pacientes:', error)
      }
    )
  }

  implementCare(care: GeneratedCare) {
    let newCare: CaresCreateModel = {
      description: care.description,
      patient_id: care.patient_id,
      doctor_id: care.doctor_id,
    }

    this.caresService.createCare(newCare)
      .subscribe(
        (response) => {
          if (response && response.data) {
            this.regenerateCares()
          }
        },
        (error) => {
          console.error('Error al obtener los pacientes:', error)
        }
      )
  }



}
