import { EventEmitter, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { TitlesModal } from '../common/titles.modal';
import { Messages } from '../common/messages.const';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  closeModalEvent: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }
  close() {
    this.closeModalEvent.emit();
  }

  openModalConfirmation(): Promise<SweetAlertResult<any>>{

  return Swal.fire({
      title: Messages.DeleteRecord,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#FF4848",
      confirmButtonText: "ACEPTAR",
      cancelButtonText: "CANCELAR",
    });
  }

  openModalConfirmationAction(){
    Swal.fire({
      title: TitlesModal.Confirmation,
      text: Messages.SuccessAction,
      icon: "success"
    });
  }

  openModalConfirmationPromise(): Promise<SweetAlertResult<any>>{
    return Swal.fire({
      title: TitlesModal.Confirmation,
      text: Messages.SuccessAction,
      icon: "success"
    });
  }

  openModalErrorAction(){
    Swal.fire({
      title: TitlesModal.Error,
      text: Messages.ErrorAction,
      icon: "error"
    });
  }
}
