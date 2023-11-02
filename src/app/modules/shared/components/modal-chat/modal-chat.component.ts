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
  selector: 'app-modal-chat',
  templateUrl: './modal-chat.component.html',
  styleUrls: ['./modal-chat.component.scss']
})
export class ModalChatComponent {
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
  ngOnInit(): void {
    this.getUserLogged();
   }

  buildForm(){
    this.form = this.fb.group({
        message: ['', Validators.required],
    });
  }
  sendMessage() {
    let message:MessageModel ={
      image_username: this.user?.file_img || '',
      image_destinatario: this.imageUser,
      type: 1,
      nombre_remitente: this.user?.name || '',
      mensaje: this.form.controls['message'].value,
      fecha: this.obtenerFechaActualMensaje(),
      hora: this.obtenerHoraMensaje()
    }
    this.chatService.sendMessage(message);
    this.form.controls['message'].setValue('');
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


   getUserLogged(){
     this.authService.user$.subscribe(user =>{
       this.user = user;
     });
   }

   close(){
    this.dialog.close();
  }

}
