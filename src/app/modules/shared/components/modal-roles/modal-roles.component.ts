import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'
import { Component, Inject, OnInit } from '@angular/core'
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
export class ModalRolesComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  rol: RolOutModel | null = null
  role_id: number | undefined

  title: string
  question: string
  pacienteId: number
  imageUser: string = ''
  userName: string = ''
  iconClass: string | undefined = 'fa-solid fa-user'
  type: string | undefined = 'Confirmation'
  action: string

  mensaje: string = ''
  nombreRemitente: string = ''

  actions = Actions

  ngOnInit(): void {
    throw new Error('Method not implemented.')
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
    this.role_id = data.role_id

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
      console.log(data)
      this.rolService.createRole(data).subscribe(() => {
        this.close()
      })
    }
  }

  UpdateRol() {
    console.log(this.form.value)
    if (this.form.valid) {
      let id: number | undefined = this.rol?.id
      let rol_data: RolModel = this.form.value
      console.log(id, rol_data)
      if (!id) {
        console.log('No se puede editar el rol')
        return
      }
      this.rolService.updateRole(id, rol_data).subscribe(() => {
        this.close()
      })
    }
  }

  DeleteRol() {
    let id: number | undefined = this.role_id
    console.log(id)
    if (!id) {
      console.log('No se puede eliminar el rol')
      return
    }
    this.rolService.deleteRole(id).subscribe(() => {
      this.close()
    })
  }
}
