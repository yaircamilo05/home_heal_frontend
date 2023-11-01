import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Icons } from 'src/app/common/icon.modal';
import { TitlesModal } from 'src/app/common/titles.modal';
import { TypeModal } from 'src/app/common/type.modal';
import { ModalMenusComponent } from 'src/app/modules/shared/components/modal-menus/modal-menus.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(
    private dialog: Dialog
  ) { }

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
