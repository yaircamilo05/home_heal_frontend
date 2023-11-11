import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuGetModel } from 'src/app/models/menu.model';
import { OutCustomModal } from 'src/app/models/out.custom.model';
import { RolModel } from 'src/app/models/rol.model';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { MenuService } from 'src/app/services/menu.service';
import { ModalService } from 'src/app/services/modal.service';

interface InputDataModel{
  title: string,
  question: string,
  iconClass?: string,
  pacienteId: number,
  imageUser: string,
  userName: string,
  type?: string
}

@Component({
  selector: 'app-modal-menus-roles',
  templateUrl: './modal-menus-roles.component.html',
  styleUrls: ['./modal-menus-roles.component.scss']
})
export class ModalMenusRolesComponent {
  title: string;
  question: string;
  pacienteId: number;
  iconClass: string | undefined = 'fa-solid fa-user';
  type:string | undefined = 'Confirmation';
  mensaje:string = "";
  imageUser:string = "";
  userName:string = "";

  nombreRemitente:string = "";
  user:UserGetWithMenusModel | null = null;
  form: FormGroup = new FormGroup({});
  rols : RolModel[] = [];
  menus: MenuGetModel[] = [];

  constructor
  (
    private modalService: ModalService,
    private dialog: DialogRef<OutCustomModal,OutCustomModal>,
    @Inject(DIALOG_DATA) private data: InputDataModel,
    private menuService: MenuService,
    private fb : FormBuilder)
  {
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

  buildForm(){
    this.form = this.fb.group({
      rol: [0, Validators.required],
      menus: [[], Validators.required],
    })};

  close(){
    this.dialog.close();
  }

  assingMenuToRol(){

        console.log(this.form.value);

  }

}
