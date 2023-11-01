import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Icons } from 'src/app/common/icon.modal';
import { TitlesModal } from 'src/app/common/titles.modal';
import { TypeModal } from 'src/app/common/type.modal';
import { MenuGetModel } from 'src/app/models/menu.model';
import { ModalMenusComponent } from 'src/app/modules/shared/components/modal-menus/modal-menus.component';
import { MenuService } from 'src/app/services/menu.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  menus: MenuGetModel[] = [];
  
  constructor(
    private dialog: Dialog,
    private menuServices: MenuService,
  ) { }

  ngOnInit(): void {
    this.getAllMenus();
  }

  getAllMenus(){
    this.menuServices.getAllMenus().subscribe(response => {
      console.log(response);
      this.menus = response.data;
    })
  }

  openModalCreateMenu(){
    let RefDialog = this.dialog.open(ModalMenusComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: TitlesModal.Menu,
        question: "",
        iconClass: Icons.Menu,
        type: TypeModal.Menu,
        imageUser: "",
        userName: ""
      }
  });
}

}
