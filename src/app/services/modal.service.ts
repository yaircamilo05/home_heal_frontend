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

  openModalConfirmation(titleModal: string): Promise<SweetAlertResult<any>>{
    return Swal.fire({
        title: titleModal,
        icon: "warning",
        iconColor: "#FF6F60",
        showCancelButton: true,
        cancelButtonColor: "#c8c4c4",
        confirmButtonColor: "#3286C0",
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

  openModalErrorAction(message: string){
    Swal.fire({
      title: TitlesModal.Error,
      text: message,
      icon: "error"
    });
  }

  openToastErrorAction(message: string){
    Swal.fire({
      toast: true,
      position: "top-end",
      text: message,
      background: "#FF6F60",
      color: "#fff",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000
    });
  }

  openToastWelcome(message: string){
    Swal.fire({
      toast: true,
      position: "top-end",
      text: message,
      color: "#fff",
      background: "#56B4E9",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000
    });
  }
}
