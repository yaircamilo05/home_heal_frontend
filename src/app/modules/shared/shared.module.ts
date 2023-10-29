import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogModule} from '@angular/cdk/dialog';
import { CustomModalComponent } from './components/custom.modal/custom.modal.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderModalComponent } from './components/header-modal/header-modal.component';



@NgModule({
  declarations: [
    ButtonComponent,
    CustomModalComponent,
    HeaderModalComponent
  ],
  exports: [
    ButtonComponent,

  ],
  imports: [
    CommonModule,
    DialogModule,

  ]
})
export class SharedModule { }
