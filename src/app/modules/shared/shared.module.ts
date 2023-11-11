import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogModule} from '@angular/cdk/dialog';
import { ButtonComponent } from './components/button/button.component';
import { HeaderModalComponent } from './components/header-modal/header-modal.component';
import { ModalChatComponent } from './components/modal-chat/modal-chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalMenusComponent } from './components/modal-menus/modal-menus.component';
import { ModalUserComponent } from './components/modal-user/modal-user.component';
import { ModalMenusRolesComponent } from './components/modal-menus-roles/modal-menus-roles.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';

@NgModule({
  declarations: [
    ButtonComponent,
    HeaderModalComponent,
    ModalChatComponent,
    ModalMenusComponent,
    ModalUserComponent,
    ModalMenusRolesComponent,
    NotFoundComponent,
    CustomModalComponent
  ],
  exports: [
    ButtonComponent,

  ],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
