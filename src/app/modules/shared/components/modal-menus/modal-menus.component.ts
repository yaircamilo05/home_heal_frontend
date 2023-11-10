import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { ModalService } from 'src/app/services/modal.service';
import { OutCustomModal } from 'src/app/models/out.custom.model';
import { MenuService } from 'src/app/services/menu.service';
import { MenuGetModel } from 'src/app/models/menu.model';


interface InputDataModel {
  title: string,
  question: string,
  iconClass?: string,
  pacienteId: number,
  imageUser: string,
  userName: string,
  type?: string
}

@Component({
  selector: 'app-modal-menus',
  templateUrl: './modal-menus.component.html',
  styleUrls: ['./modal-menus.component.scss']
})


export class ModalMenusComponent {

  title: string;
  question: string;
  pacienteId: number;
  iconClass: string | undefined = 'fa-solid fa-user';
  type: string | undefined = 'Confirmation';
  mensaje: string = "";
  imageUser: string = "";
  userName: string = "";

  nombreRemitente: string = "";
  user: UserGetWithMenusModel | null = null;
  form: FormGroup = new FormGroup({});

  constructor
    (
      private modalService: ModalService,
      private dialog: DialogRef<OutCustomModal, OutCustomModal>,
      @Inject(DIALOG_DATA) private data: InputDataModel,
      private menuService: MenuService,
      private fb: FormBuilder) {
    this.title = data.title;
    this.question = data.question;
    this.imageUser = data.imageUser;
    this.iconClass = data.iconClass;
    this.userName = data.userName;
    this.type = data.type;
    this.pacienteId = data.pacienteId;
    this.buildForm();

    this.modalService.closeModalEvent.subscribe(() => {
      this.close();
    });
  }

  buildForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      icon: ['', Validators.required],
      link: ['', Validators.required]
    })
  };

  close() {
    this.dialog.close();
  }

  CreateMenu() {
    if (this.form.valid) {
      let data: MenuGetModel = this.form.value
      console.log(data);
      this.menuService.createMenu(data).subscribe(() => {
        this.close();
      });
    };

  }

}
