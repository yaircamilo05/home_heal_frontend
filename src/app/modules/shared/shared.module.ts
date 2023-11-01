import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogModule} from '@angular/cdk/dialog';
import { ButtonComponent } from './components/button/button.component';
import { HeaderModalComponent } from './components/header-modal/header-modal.component';
import { ModalChatComponent } from './components/modal-chat/modal-chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalMenusComponent } from './components/modal-menus/modal-menus.component';



@NgModule({
  declarations: [
    ButtonComponent,
    HeaderModalComponent,
    ModalChatComponent,
    ModalMenusComponent
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
