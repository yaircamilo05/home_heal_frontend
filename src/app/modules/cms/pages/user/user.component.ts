import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Icons } from 'src/app/common/icon.modal';
import { Messages } from 'src/app/common/messages.const';
import { TitlesModal } from 'src/app/common/titles.modal';
import { TypeModal } from 'src/app/common/type.modal';
import { UserCreateModel, UserGetModel, UserGetWithMenusModel } from 'src/app/models/user.model';
import { ModalUserComponent } from 'src/app/modules/shared/components/modal-user/modal-user.component';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users: UserGetModel[] = [];

  constructor(
    private dialog: Dialog,
    private userService: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        // Verifica si obtienes los datos correctamente
        console.log(response);
        if (response && response.data) {
          this.users = response.data;
        }
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
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
    });
  }

  async openModalDeleteUser(user: UserGetModel) {
   var deleted = await this.modalService.openModalConfirmation(Messages.DeleteRecord);
    if (deleted.isConfirmed){
      this.DeleteUser(user.id);
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
    });
  }

  DeleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        console.log(response); // Verifica si obtienes los datos correctamente
        if (response && response.data) {
          this.modalService.openModalConfirmationAction();
          this.getAllUsers();
        }
      },
      (error) => {
        this.modalService.openModalErrorAction(Messages.ErrorAction);
      }
    );
  }
}
