import { Component, Inject } from '@angular/core';
import { DiagnosticsService } from 'src/app/services/diagnostics.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalService } from 'src/app/services/modal.service';
import { StorageService } from 'src/app/services/storage.service';
import { DialogData } from '../modal-cares/modal-cares.component';
import { DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiagnosesCreateModel as CreateDiagnosisModel, Diagnosis } from 'src/app/models/diagnoses.model';
import { VitalSingsService } from 'src/app/services/vital.sings.service';

@Component({
  selector: 'app-modal-diagnostic',
  templateUrl: './modal-diagnostic.component.html',
  styleUrls: ['./modal-diagnostic.component.scss']
})
export class ModalDiagnosticComponent {

  diagnoses: Diagnosis[] = []
  form: FormGroup = new FormGroup({})
  viewForm: boolean = false
  id_patient: number = 0

  showMore: boolean = false

  // actualVitalSigns: VitalSingsService

  constructor(
    private diagnosesService: DiagnosticsService,
    private modalService: ModalService,
    private storageService: StorageService,
    private doctorService: DoctorService,
    private dialog: Dialog,
    @Inject(DIALOG_DATA) private data: DialogData,
  ) {
    this.id_patient = data.patientId
    this.modalService.closeModalEvent.subscribe(() => {
      this.close()
    })
  }

  toggleShowMore() {
    this.showMore = !this.showMore
  }

  expandedDiagnosis: { [key: number]: boolean } = {}; // Usando el ID del diagnóstico como clave
  toggleExpand(id: number) {
    this.expandedDiagnosis[id] = !this.expandedDiagnosis[id];
  }

  ngOnInit() {
    this.getDiagnoses()
    this.buildForm()
  }

  buildForm() {
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
    })
  }

  getDiagnoses() {
    //?cambiarlo por el id del paciente del input
    this.diagnosesService.getDiagnoses(this.id_patient).subscribe(
      (response) => {
        if (response && response.data) {
          this.diagnoses = response.data
        }
      },
      (error: any) => {
        this.modalService.openModalErrorAction("Ha ocurrido un error obteniendo los cuidados")
        console.log(error)
      }
    )
  }

  close() {
    this.dialog.closeAll()
  }

  createDiagnosis() {
    if (this.form.valid) {
      this.doctorService.getDoctorByUserId(this.storageService.getUserId()).subscribe(
        (response) => {
          if (response && response.data) {
            this.sendRequest(response.data.id)
          }
        },
        (error: any) => {
          console.error(error)
          this.modalService.openModalErrorAction("Ha ocurrido un error obteniendo el doctor")
        }
      )
    }
  }

  sendRequest(doctorId: number) {
    let data: CreateDiagnosisModel = {
      description: this.form.value.description,
      doctor_id: doctorId, // Buscarlo en el storage service 
      patient_id: this.id_patient // Cambiarlo por el input
    }
    this.diagnosesService.createDiagnosis(data).subscribe(
      (response) => {
        if (response && response.data) {
          this.modalService.openModalConfirmationPromise().then((result) => {
            if (result.isConfirmed) {
              // window.location.reload()
              // this.caresService.loadCares(this.id_patient)
              this.getDiagnoses()
            }
          })
        }
      },
      (error: any) => {
        this.modalService.openModalErrorAction("Ha ocurrido un error creando el cuidado")
        console.log(error)
      }
    )
  }

  deleteDiagnosis(id: number) {
    this.diagnosesService.getDiagnoses(id).subscribe(
      (response) => {
        if (response && response.data) {
          this.modalService.openModalConfirmationPromise().then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
            }
          })
        }
      },
      (error: any) => {
        console.error(error)
        this.modalService.openModalErrorAction("Ha ocurrido un error eliminando el cuidado")
      }
    )
  }


  openCloseForm() {
    this.viewForm = !this.viewForm
  }

  getRole(){
    return this.storageService.getRolId()
  }
}
