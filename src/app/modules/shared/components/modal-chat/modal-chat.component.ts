import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageModel } from 'src/app/models/message.model';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from './../../../../services/auth.service';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { ModalService } from 'src/app/services/modal.service';
import { OutCustomModal } from 'src/app/models/out.custom.model';
import { ConversationModel } from 'src/app/models/conversation.model';
import { SockectioService } from './../../../../services/sockectio.service';
import { StorageService } from 'src/app/services/storage.service';

interface InputDataModel {
  title: string,
  question: string,
  iconClass?: string,
  pacienteId: number,
  imageUser: string,
  userName: string,
  type?: string,
  room: string,
  to: string
}

@Component({
  selector: 'app-modal-chat',
  templateUrl: './modal-chat.component.html',
  styleUrls: ['./modal-chat.component.scss']
})
export class ModalChatComponent {
  title: string;
  question: string;
  pacienteId: number;
  iconClass: string | undefined = 'fa-solid fa-user';
  type: string | undefined = 'Confirmation';
  mensaje: string = "";
  imageUser: string = "";
  userName: string = "";
  room: string = "";
  to: string = "";

  nombreRemitente: string = "";
  user: UserGetWithMenusModel | null = null;
  form: FormGroup = new FormGroup({});


  constructor
    (public chatService: ChatService,
      private authService: AuthService,
      private modalService: ModalService,
      private storageService: StorageService,
      private dialog: DialogRef<OutCustomModal, OutCustomModal>,
      @Inject(DIALOG_DATA) private data: InputDataModel,

      private fb: FormBuilder) {
    this.title = data.title;
    this.question = data.question;
    this.imageUser = data.imageUser;
    this.iconClass = data.iconClass;
    this.userName = data.userName;
    this.type = data.type;
    this.pacienteId = data.pacienteId;
    this.room = data.room;
    this.to = data.to;

    this.buildForm();

    this.modalService.closeModalEvent.subscribe(() => {
      this.close();
    });

  }
  ngOnInit(): void {
    this.getUserLogged();
  }

  buildForm() {
    this.form = this.fb.group({
      message: ['', Validators.required],
    });
  }
  sendMessage() {
    let message: MessageModel = {
      room: this.room || '',
      email: this.user?.email || '',
      image_username: this.user?.image_url || '',
      image_destinatario: this.imageUser,
      type: 1,
      nombre_remitente: this.user?.name || '',
      mensaje: this.form.controls['message'].value,
      fecha: this.obtenerFechaActualMensaje(),
      hora: this.obtenerHoraMensaje()
    }
    this.chatService.sendMessagePrivate(message);
    this.form.controls['message'].setValue('');
  }


  getUserConnected() {
    this.chatService
  }
  obtenerHoraMensaje(): string {
    let fecha = new Date();
    // Obtén la hora, minutos y segundos
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    let horaEnString = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    return horaEnString;
  }


  obtenerFechaActualMensaje(): string {
    let fecha = new Date();
    let fechaPrueba = fecha.toDateString();
    const opcionesDeFormato = {
      weekday: 'long', // Día de la semana en formato largo
      year: 'numeric',
      month: 'long', // Nombre del mes en formato largo
      day: 'numeric' // Día del mes
    };

    // Formatea la fecha en español
    const fechaEnEspanol = fecha.toLocaleDateString('es-ES');

    console.log(fechaEnEspanol);
    return fechaPrueba;
  }

  getUserLogged() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  messageIsForMyOrSendForMy(message: MessageModel): boolean {
    console.log(message);
    return message.room == this.room || message.email == this.storageService.getUsername();
  }

  close() {
    this.dialog.close();
  }


}
