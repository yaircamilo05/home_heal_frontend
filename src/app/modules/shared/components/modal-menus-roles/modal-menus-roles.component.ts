import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component,Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuGetModel } from 'src/app/models/menu.model';
import { OutCustomModal } from 'src/app/models/out.custom.model';
import { RolOutModel } from 'src/app/models/rol.model';
import { MenuService } from 'src/app/services/menu.service';
import { MenusRolesService } from 'src/app/services/menus-roles.service';
import { ModalService } from 'src/app/services/modal.service';
import { RolService } from 'src/app/services/rol.service';

interface InputDataModel{
  title: string,
  question: string,
  iconClass?: string,
  type?: string
}

@Component({
  selector: 'app-modal-menus-roles',
  templateUrl: './modal-menus-roles.component.html',
  styleUrls: ['./modal-menus-roles.component.scss']
})
export class ModalMenusRolesComponent implements OnInit {
  title: string;
  question: string;
  iconClass: string | undefined = 'fa-solid fa-user';
  type:string | undefined = 'Confirmation';
  form: FormGroup = new FormGroup({});
  rols : RolOutModel[] = [];
  menus: MenuGetModel[] = [];

  constructor
  (
    private modalService: ModalService,
    private dialog: DialogRef<OutCustomModal,OutCustomModal>,
    @Inject(DIALOG_DATA) private data: InputDataModel,
    private menuService: MenuService,
    private rolService : RolService,
    private menuRolService: MenusRolesService,
    private fb : FormBuilder)
  {
    this.title = data.title;
    this.question = data.question;
    this.iconClass = data.iconClass;
    this.type = data.type;
    this.buildForm();

    this.modalService.closeModalEvent.subscribe(() => {
      this.close();
    });
  }
  ngOnInit(): void {
    this.getAllRols();
    this.getAllMenus();
  }

  buildForm(){
    this.form = this.fb.group({
      rol_id: [0,Validators.required],
      menu_id: [0,Validators.required],
    })};

  close(){
    this.dialog.close();
  }

  assingMenuToRol(){
    if(this.form.valid && this.form.value.rol_id != 0 && this.form.value.menu_id != 0){
      var rol_id:number = this.form.value.rol_id;
      var menu_id:number = this.form.value.menu_id;
      this.menuRolService.asignMenuToRole(rol_id,menu_id).subscribe( async (response) => {
        if(response.data){
          this.close();
          var confirm = await this.modalService.openModalConfirmationPromise();
          if (confirm.isConfirmed) window.location.reload();
        }
      });
    }
  }

  getAllMenus(){
    this.menuService.getAllMenus().subscribe((response) => {
      this.menus = response.data;
    });
  }

  getAllRols(){
    this.rolService.getRoles().subscribe((response) => {
      this.rols = response.data;
    });
  }

}
