import { Dialog } from '@angular/cdk/dialog'
import { Component } from '@angular/core'
import { Icons } from 'src/app/common/icon.modal'
import { Messages } from 'src/app/common/messages.const'
import { Roles } from 'src/app/common/rols.const'
import { TitlesModal } from 'src/app/common/titles.modal'
import { TypeModal } from 'src/app/common/type.modal'
import { MessageModel } from 'src/app/models/message.model'
import { UserCreateModel, UserGetModel, UserGetWithMenusModel } from 'src/app/models/user.model'
import { ModalChatComponent } from 'src/app/modules/shared/components/modal-chat/modal-chat.component'
import { ModalUserComponent } from 'src/app/modules/shared/components/modal-user/modal-user.component'
import { AuthService } from 'src/app/services/auth.service'
import { ChatService } from 'src/app/services/chat.service'
import { ModalService } from 'src/app/services/modal.service'
import { SockectioService } from 'src/app/services/sockectio.service'
import { StorageService } from 'src/app/services/storage.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users: UserGetModel[] = [];
  user: UserGetWithMenusModel | null = null;
  showNotificationNewMessage: boolean = false;
  messagesRecived: MessageModel[] = [];
  countMessageRecived: number = 0;
  modalOpen: boolean = false;
  userOpenModal: string = "";
  notificationSound = new Audio('../../../../../assets/sounds/tono.mp3'); // Asegúrate de reemplazar esto con la ruta a tu archivo de audio
  firtMessageRecived: MessageModel | null = null
  limit: number | undefined = 10
  forename: string = ''
  surname: string = ''
  mail: string = ''

  constructor(
    private dialog: Dialog,
    private chatService: ChatService,
    private userService: UserService,
    private modalService: ModalService,
    private authService: AuthService,
    private storageService: StorageService,
    private socketService: SockectioService
  ) {
    this.chatService.newMessageEvent.subscribe((message) => {
      this.messagesRecived.push(message)
      this.playNotificationSound()
      this.firtMessageRecived = this.messagesRecived[0]
      this.countMessageRecived = this.messagesRecived.length
      this.showNotificationNewMessage = true
      if (!this.modalOpen)
        this.modalService.openToastWelcome(Messages.newMessage(message))
      console.log('message', message, 'notification', this.showNotificationNewMessage)
    })
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  clearFilter() {
    this.surname = '';
    this.forename = '';
    this.mail = '';
    this.limit = undefined;
  }

  messageIsForMy(message: MessageModel): boolean {
    return message.room === this.storageService.getUsername();
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        // Verifica si obtienes los datos correctamente
        console.log(response)
        if (response && response.data) {
          this.users = response.data
        }
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error)
      }
    )
  }

  getUserLogged() {
    this.authService.user$.subscribe(user => {
      this.user = user
    })
  }
  openModalEditUser(user: UserGetModel) {
    this.dialog.open(ModalUserComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: TitlesModal.User,
        question: '',
        iconClass: Icons.User,
        type: TypeModal.User,
        imageUser: '',
        userName: '',
        isEdit: true,
        user: user
      }
    })
  }

  async openModalDeleteUser(user: UserGetModel) {
    var deleted = await this.modalService.openModalConfirmation(Messages.DeleteRecord)
    if (deleted.isConfirmed) {
      this.DeleteUser(user.id)
    }
  }

  openModalCreateUser() {
    let RefDialog = this.dialog.open(ModalUserComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: TitlesModal.User,
        question: '',
        iconClass: Icons.User,
        type: TypeModal.User,
        imageUser: '',
        userName: '',
        isEdit: false,
        user: null
      }
    })
  }

  DeleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        console.log(response) // Verifica si obtienes los datos correctamente
        if (response && response.data) {
          this.modalService.openModalConfirmationAction()
          this.getAllUsers()
        }
      },
      (error) => {
        this.modalService.openModalErrorAction(Messages.ErrorAction)
      }
    )
  }

  openModalChat(user: UserGetModel) {
    this.showNotificationNewMessage = false
    this.modalOpen = true
    let RefDialog = this.dialog.open(ModalChatComponent, {
      minWidth: '800px',
      minHeight: '80%',
      maxWidth: '50%',
      data: {
        title: TitlesModal.Chat,
        question: '',
        iconClass: Icons.Chat,
        type: TypeModal.Chat,
        imageUser: user.image_url,
        userName: user.name,
        room: user.email
      }
    });
  }

  showNoficationNewMessage(user: UserGetModel) {
    return this.showNotificationNewMessage && this.exitMessageOfuser(user);
  }

  exitMessageOfuser(userre: UserGetModel) {
    const encontrado = this.messagesRecived.find(user => user.email == userre.email);
    return encontrado;
  }

  openModalUser(user:UserGetModel):boolean{
    return this.userOpenModal === user.email && this.modalOpen;
  }

  // getRol(rolId:number): string{
  //   return this.storageService.getRolId() == rolId ? Roles.Admin : Roles.User;
  // }
  getCountMessageRecived(user: UserGetModel) {
    var caountMessageOfUser = this.messagesRecived.filter(userMessage => userMessage.email == user.email).length;
    return caountMessageOfUser;
  }
  playNotificationSound() {
    this.notificationSound.play();
  }
}

