import { DIALOG_DATA, Dialog } from '@angular/cdk/dialog'
import { Component, Inject, Input } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Cares, CaresCreateModel } from 'src/app/models/cares.model'
import { DoctorModel } from 'src/app/models/doctor.model'
import { CaresService } from 'src/app/services/cares.service'
import { DoctorService } from 'src/app/services/doctor.service'
import { ModalService } from 'src/app/services/modal.service'
import { StorageService } from 'src/app/services/storage.service'

export interface DialogData {
  patientId: number
}

@Component({
  selector: 'app-modal-cares',
  templateUrl: './modal-cares.component.html',
  styleUrls: ['./modal-cares.component.scss']
})



export class ModalCaresComponent {
  cares: Cares[] = []
  form: FormGroup = new FormGroup({})
  viewForm: boolean = false
  id_patient: number = 0

  constructor(
    private caresService: CaresService,
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

  ngOnInit() {
    this.getCares()
    this.buildForm()
  }
  close() {
    this.dialog.closeAll()
  }

  buildForm() {
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
    })
  }



  getCares() {
    //?cambiarlo por el id del paciente del input
    this.caresService.getCares(this.id_patient).subscribe(
      (response) => {
        if (response && response.data) {
          this.cares = response.data
        }
      },
      (error: any) => {
        this.modalService.openModalErrorAction("Ha ocurrido un error obteniendo los cuidados")
        console.log(error)
      }
    )
  }

  createCare() {
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

  sendRequest(doctor_id: number) {
    let data: CaresCreateModel = {
      description: this.form.value.description,
      doctor_id: doctor_id, // Buscarlo en el storage service 
      patient_id: this.id_patient // Cambiarlo por el input
    }
    this.caresService.createCare(data).subscribe(
      (response) => {
        if (response && response.data) {
          this.modalService.openModalConfirmationPromise().then((result) => {
            if (result.isConfirmed) {
              // window.location.reload()
              // this.caresService.loadCares(this.id_patient)
              this.getCares()
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

  deleteCare(id: number) {
    this.caresService.deleteCare(id).subscribe(
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
    return this.storageService.getRolId();
  }

}
