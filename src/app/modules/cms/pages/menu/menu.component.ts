import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Icons } from 'src/app/common/icon.modal';
import { TitlesModal } from 'src/app/common/titles.modal';
import { TypeModal } from 'src/app/common/type.modal';
import { MenuGetModel } from 'src/app/models/menu.model';
import { ModalMenusComponent } from 'src/app/modules/shared/components/modal-menus/modal-menus.component';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menus: MenuGetModel[] = [];

  constructor(
    private dialog: Dialog,
    private menuServices: MenuService
  ) { }

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

  openModalEditMenu(menu: MenuGetModel) {
    // Implementa esta función si necesitas editar menús
  }

  openModalDeleteMenu(menu: MenuGetModel) {
    // Implementa esta función si necesitas eliminar menús
  }

  openModalCreateMenu() {
    let RefDialog = this.dialog.open(ModalMenusComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
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
}
