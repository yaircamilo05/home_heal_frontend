import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Icons } from 'src/app/common/icon.modal';
import { Messages } from 'src/app/common/messages.const';
import { TitlesModal } from 'src/app/common/titles.modal';
import { TypeModal } from 'src/app/common/type.modal';
import { RolWithMenusModel } from 'src/app/models/rol.with.menus.model';
import { CustomModalComponent } from 'src/app/modules/shared/components/custom-modal/custom-modal.component';
import { ModalMenusRolesComponent } from 'src/app/modules/shared/components/modal-menus-roles/modal-menus-roles.component';
import { MenusRolesService } from 'src/app/services/menus-roles.service';

@Component({
  selector: 'app-menu-roles',
  templateUrl: './menu-roles.component.html',
  styleUrls: ['./menu-roles.component.scss']
})
export class MenuRolesComponent implements OnInit{
 rolsWithMenus: RolWithMenusModel[] = []
constructor(
  private menusRolService:MenusRolesService,
  private dialog: Dialog
) { }

  ngOnInit(){
    this.getRolesWithMenus();
  }

  getRolesWithMenus(){
    this.menusRolService.getAllRolsWithMenus().subscribe(response =>{
      this.rolsWithMenus = response.data;
    });
  }

  openModalAssignModuleToRol() {
    let RefDialog = this.dialog.open(ModalMenusRolesComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: TitlesModal.Modules,
        question: '',
        iconClass: Icons.Modules,
        type: TypeModal.Modules,
        imageUser: '',
        userName: ''
      }
    });
  }

  openModalEditModuleToRol() {

  }

  openModalDeleteModuleToRol() {
    let RefDialog = this.dialog.open(CustomModalComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: TitlesModal.Confirmation,
        question: Messages.DeleteRecord,
        iconClass: Icons.Question,
        type: TypeModal.Confirmation,
      }
    });

    RefDialog.closed.subscribe((response) => {
      console.log(response);
      if (response) {
        this.deleteMenuToRol();
      }
    });
  }



  deleteMenuToRol(){
    console.log("deleteMenuToRol");
  }
}
