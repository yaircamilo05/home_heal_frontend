import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Icons } from 'src/app/common/icon.modal';
import { TitlesModal } from 'src/app/common/titles.modal';
import { TypeModal } from 'src/app/common/type.modal';
import { MenuGetModel } from 'src/app/models/menu.model';
import { ModalMenusComponent } from 'src/app/modules/shared/components/modal-menus/modal-menus.component';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';

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
  ) {}

  ngOnInit(): void {
    this.getAllMenus();
  }

  getAllMenus() {
    this.menuServices.getAllMenus().subscribe(
      (response) => {
        console.log(response); // Verifica si obtienes los datos correctamente
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
    Swal.fire({
      title: "¿Seguro quieres?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
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
