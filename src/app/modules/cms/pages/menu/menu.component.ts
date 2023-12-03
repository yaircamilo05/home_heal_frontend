import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Icons } from 'src/app/common/icon.modal';
import { Messages } from 'src/app/common/messages.const';
import { TitlesModal } from 'src/app/common/titles.modal';
import { TypeModal } from 'src/app/common/type.modal';
import { MenuGetModel } from 'src/app/models/menu.model';
import { ModalMenusComponent } from 'src/app/modules/shared/components/modal-menus/modal-menus.component';
import { MenuService } from 'src/app/services/menu.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menus: MenuGetModel[] = [];

  menuTitle: string = ''
  limit: number | undefined = 10;

  constructor(
    private dialog: Dialog,
    private menuServices: MenuService,
    private modalService: ModalService
  ) { }

  clearFilter() {
    this.menuTitle = '';
    this.limit = undefined;
  }

  ngOnInit(): void {
    this.getAllMenus();
  }

  getAllMenus() {
    this.menuServices.getAllMenus().subscribe(
      (response) => {
        // Verifica si obtienes los datos correctamente
        console.log(response);
        if (response && response.data) {
          this.menus = response.data;
        }
      },
      (error) => {
        console.error('Error al obtener los menús:', error);
      }
    );
  }

  async openModalDeleteMenu(menu: MenuGetModel) {
    var deleted = await this.modalService.openModalConfirmation(Messages.DeleteRecord);
    if (deleted.isConfirmed) {
      this.DeleteMenu(menu.id);
    }
  }

  openModalCreateMenu() {
    let RefDialog = this.dialog.open(ModalMenusComponent, {
      minWidth: '600px',
      minHeight: '80%',
      maxWidth: '600px',
      data: {
        title: TitlesModal.Menu,
        question: '',
        iconClass: Icons.Menu,
        type: TypeModal.Menu,
        imageUser: '',
        userName: ''
      }
    });
  }

  openModalEditMenu(menu: MenuGetModel) {
    let RefDialog = this.dialog.open(ModalMenusComponent, {
      minWidth: '600px',
      minHeight: '80%',
      maxWidth: '600px',
      data: {
        title: TitlesModal.Menu,
        question: '',
        iconClass: Icons.Menu,
        type: TypeModal.Menu,
        imageUser: '',
        userName: '',
        menu: menu
      }
    });
  }

  DeleteMenu(menuId: number) {
    this.menuServices.deleteMenu(menuId).subscribe(
      (response) => {
        console.log(response); // Verifica si obtienes los datos correctamente
        if (response && response.data) {
          this.modalService.openModalConfirmationAction();
          this.getAllMenus();
        }
      },
      (error) => {
        this.modalService.openModalErrorAction(Messages.ErrorAction);
      }
    );
  }
}

