import { Component, OnInit } from '@angular/core'
import { Dialog } from '@angular/cdk/dialog'
import { RolService } from 'src/app/services/rol.service'
import { RolOutModel } from 'src/app/models/rol.model'
import { TitlesModal } from 'src/app/common/titles.modal'
import { TypeModal } from 'src/app/common/type.modal'
import { Icons } from 'src/app/common/icon.modal'
import { Actions } from 'src/app/common/actions'
import { ModalRolesComponent } from 'src/app/modules/shared/components/modal-roles/modal-roles.component'

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss'],
})
export class RolComponent implements OnInit {
  roles: RolOutModel[] = []
  role: RolOutModel | null = null
  role_id: number | undefined

  constructor(
    private dialog: Dialog,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
    this.getRoles()
  }

  getRoles() {
    this.rolService.getRoles().subscribe(
      (response) => {
        // Verifica si obtienes los datos correctamente
        console.log(response)
        if (response && response.data) {
          this.roles = response.data
        }
      },
      (error) => {
        console.error('Error al obtener los roles:', error)
      }
    )
  }

  getRole(id: number) {
    this.rolService.getRole(id).subscribe(
      (response) => {
        // Verifica si obtienes los datos correctamente
        console.log(response)
        if (response && response.data) {
          this.role = response.data
        }
      },
      (error) => {
        console.error('Error al obtener los roles:', error)
      }
    )
  }


  openModalCreateRole() {
    this.dialog.open(ModalRolesComponent, {
      minWidth: '50%',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: `${Actions.Create} ${TitlesModal.Rol}`,
        iconClass: Icons.Rol,
        type: TypeModal.Rol,
        question: '',
        imageUser: '',
        userName: '',
        action: Actions.Create,
      }
    })
  }

  openModalEditRole(rol: RolOutModel) {
    this.dialog.open(ModalRolesComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: `${Actions.Update} ${TitlesModal.Rol}`,
        iconClass: Icons.Rol,
        type: TypeModal.Rol,
        question: '',
        imageUser: '',
        userName: '',
        action: Actions.Update,
        rol: rol
      }
    })
  }

  openModalDeleteRole(rol_id: number) {
    this.dialog.open(ModalRolesComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: `${Actions.Delete} ${TitlesModal.Rol}`,
        iconClass: Icons.Rol,
        type: TypeModal.Rol,
        question: '',
        imageUser: '',
        userName: '',
        action: Actions.Delete,
        role_id: rol_id
      }
    })
  }
}
