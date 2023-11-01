import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageModel } from 'src/app/models/message.model';
import { ChatService } from 'src/app/services/chat.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from './../../../../services/auth.service';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { ModalService } from 'src/app/services/modal.service';
import { OutCustomModal } from 'src/app/models/out.custom.model';


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
  selector: 'app-modal-menus',
  templateUrl: './modal-menus.component.html',
  styleUrls: ['./modal-menus.component.scss']
})


export class ModalMenusComponent {

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

  constructor
  ( public chatService: ChatService,
    private authService: AuthService,
    private modalService: ModalService,
    private dialog: DialogRef<OutCustomModal,OutCustomModal>,
    @Inject(DIALOG_DATA) private data: InputDataModel,

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
        message: ['', Validators.required],
    })};

  close(){
    this.dialog.close();
  }

  CreateMenu(){
    
  }

}
