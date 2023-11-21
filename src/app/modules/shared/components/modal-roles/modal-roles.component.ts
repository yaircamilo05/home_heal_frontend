import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'
import { Component, Inject, } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { OutCustomModal } from 'src/app/models/out.custom.model'
import { RolModel, RolOutModel } from 'src/app/models/rol.model'
import { ModalService } from 'src/app/services/modal.service'
import { RolService } from 'src/app/services/rol.service'
import { Actions } from 'src/app/common/actions'
// import { Actions } from 'src/app/common/actions'


interface InputDataModel {
  title: string,
  question: string,
  pacienteId: number,
  imageUser: string,
  userName: string,
  iconClass?: string,
  type?: string,
  action: string,

  rol: RolOutModel | null,
  role_id: number | undefined,
}

@Component({
  selector: 'app-modal-roles',
  templateUrl: './modal-roles.component.html',
  styleUrls: ['./modal-roles.component.scss']
})
export class ModalRolesComponent {
  form: FormGroup = new FormGroup({})
  rol: RolOutModel | null = null
  // role_id: number | undefined

  title: string
  question: string
  pacienteId: number
  imageUser: string = ''
  userName: string = ''
  iconClass: string | undefined = 'fa-solid fa-user'
  type: string | undefined = 'Confirmation'
  action: string
  isEditing: boolean = false

  mensaje: string = ''
  nombreRemitente: string = ''

  actions = Actions

  ngOnInit(): void {
    if (this.rol) {
      this.isEditing = true
    }
  }

  constructor(
    @Inject(DIALOG_DATA) private data: InputDataModel,
    private modalService: ModalService,
    private dialog: DialogRef<OutCustomModal, OutCustomModal>,
    private rolService: RolService,
    public fb: FormBuilder,
  ) {
    this.title = data.title
    this.question = data.question
    this.pacienteId = data.pacienteId
    this.imageUser = data.imageUser
    this.userName = data.userName
    this.iconClass = data.iconClass
    this.type = data.type
    this.action = data.action

    this.rol = data.rol

    this.buildForm()

    this.modalService.closeModalEvent.subscribe(() => {
      this.close()
    })
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.rol?.name ?? '', Validators.required],
      description: [this.rol?.description ?? '', Validators.required],
    })
  }

  close() {
    this.dialog.close()
  }

  CreateRol() {
    console.log(this.form.value)
    if (this.form.valid) {
      let data: RolModel = this.form.value
      this.rolService.createRole(data).subscribe(async () => {
        this.close()
        let confirm = await this.modalService.openModalConfirmationPromise()
        if (confirm.isConfirmed) window.location.reload()
      })
    }
  }

  UpdateRol() {
    console.log(this.form.value)
    if (this.form.valid) {
      let rolData: RolModel = this.form.value
      let rolId: number = this.rol?.id ?? -1
      console.log(rolId, rolData)
      if (!rolId || rolId <= 0) {
        console.log('No se puede editar el rol')
        return
      }
      this.rolService.updateRole(rolId, rolData).subscribe(async () => {
        this.close()
        let confirm = await this.modalService.openModalConfirmationPromise()
        if (confirm.isConfirmed) window.location.reload()
      })
    }
  }

}
