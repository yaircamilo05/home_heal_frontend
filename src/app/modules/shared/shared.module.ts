import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@angular/cdk/dialog';
import { ButtonComponent } from './components/button/button.component';
import { HeaderModalComponent } from './components/header-modal/header-modal.component';
import { ModalChatComponent } from './components/modal-chat/modal-chat.component';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { ModalMenusComponent } from './components/modal-menus/modal-menus.component';
import { ModalUserComponent } from './components/modal-user/modal-user.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { ModalMenusRolesComponent } from './components/modal-menus-roles/modal-menus-roles.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ModalRolesComponent } from './components/modal-roles/modal-roles.component';


@NgModule({
  declarations: [
    ButtonComponent,
    CarouselComponent,
    HeaderModalComponent,
    ModalChatComponent,
    ModalMenusComponent,
    ModalRolesComponent,
    ModalUserComponent,
    ModalMenusRolesComponent,
    NotFoundComponent,
    CustomModalComponent,
  ],
  exports: [
    ButtonComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
