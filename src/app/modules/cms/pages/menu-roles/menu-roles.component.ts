import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Icons } from 'src/app/common/icon.modal';
import { Messages } from 'src/app/common/messages.const';
import { TitlesModal } from 'src/app/common/titles.modal';
import { TypeModal } from 'src/app/common/type.modal';
import { RolWithMenusModel } from 'src/app/models/rol.with.menus.model';
import { CustomModalComponent } from 'src/app/modules/shared/components/custom-modal/custom-modal.component';
import { ModalMenusRolesComponent } from 'src/app/modules/shared/components/modal-menus-roles/modal-menus-roles.component';
import { MenusRolesService } from 'src/app/services/menus.roles.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-menu-roles',
  templateUrl: './menu-roles.component.html',
  styleUrls: ['./menu-roles.component.scss']
})
export class MenuRolesComponent implements OnInit{
 rolsWithMenus: RolWithMenusModel[] = []
 menuId: number = 0;
constructor(
  private menusRolService:MenusRolesService,
  private dialog: Dialog,
  private modalService: ModalService
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
        title: TitlesModal.Module,
        question: '',
        iconClass: Icons.Module,
        type: TypeModal.Module,
        imageUser: '',
        userName: ''
      }
    });
  }

  async openModalDeleteMenuToRol(rolId: number) {
    var deleted = await this.modalService.openModalConfirmation(Messages.DeleteRecord);
     if (deleted.isConfirmed){
       this.DeleteMenu(this.menuId, rolId);
     }
   }

   DeleteMenu(menuId: number, rolId: number) {
    if(menuId != 0){
      this.menusRolService.deleteMenuToRole(rolId, menuId).subscribe(response =>{
        this.modalService.openModalConfirmationAction();
        this.getRolesWithMenus();
      });
   }
  }

  selectMenu(event: any): void {
     this.menuId = event.target.value;
     console.log('menuid',this.menuId, 'event',event);
  }
}
