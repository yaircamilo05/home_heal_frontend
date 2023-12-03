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
import { ModalVitalSignsComponent } from './components/modal-vital-signs/modal-vital-signs.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import { GraphicsAllAgainstAllComponent } from './components/graphics-all-against-all/graphics-all-against-all.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { ModalCaresComponent } from './components/modal-cares/modal-cares.component';

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
    ModalVitalSignsComponent,
    GraphicsAllAgainstAllComponent,
    SendEmailComponent,
    ModalCaresComponent,

  ],
  exports: [
    ButtonComponent,
    CarouselComponent,
    GraphicsAllAgainstAllComponent,
    SendEmailComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatIconModule,
    NgApexchartsModule
  ]
})
export class SharedModule { }
