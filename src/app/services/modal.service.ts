import { Injectable } from '@angular/core';
import { TitlesModal } from '../common/titles.modal';
import { IconsModal } from '../common/icon.modal';
import { TypeModal } from '../common/type.modal';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { CustomModalComponent } from '../modules/shared/components/custom.modal/custom.modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
    minWidth:string = '400px';
    minHeight:string = '200px';
    showConfirmation(message:string, dialog: Dialog): DialogRef<unknown,CustomModalComponent>{
     return dialog.open(CustomModalComponent, {
         minWidth: this.minWidth,
         minHeight: this.minHeight,
         data: {
          title: TitlesModal.Confirmation,
          question: message,
          iconClass: IconsModal.Question,
          type:TypeModal.Confirmation
        }
      })
    }

    showError(message:string, dialog: Dialog): DialogRef<unknown,CustomModalComponent>{
      return dialog.open(CustomModalComponent, {
          minWidth: this.minWidth,
          minHeight: this.minHeight,
         data: {
           title: TitlesModal.Error,
           question: message,
           iconClass: IconsModal.Error,
           type:TypeModal.Error
         }
       })
     }

     showAlert(message:string, dialog: Dialog): DialogRef<unknown,CustomModalComponent>{
      return dialog.open(CustomModalComponent, {
        minWidth: this.minWidth,
        minHeight: this.minHeight,
        data: {
           title: TitlesModal.Alert,
           question: message,
           iconClass: IconsModal.Alert,
           type:TypeModal.Alert
         }
       })
     }
     showSucceed(message:string, dialog: Dialog): DialogRef<unknown,CustomModalComponent>{
      return dialog.open(CustomModalComponent, {
          minWidth: this.minWidth,
          minHeight: this.minHeight,
         data: {
           title: TitlesModal.Succeed,
           question: message,
           iconClass: IconsModal.Succeed,
           type:TypeModal.Succeed
         }
       })
     }
  }
