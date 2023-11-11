import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { OutCustomModal } from 'src/app/models/out.custom.model';
import { ModalService } from 'src/app/services/modal.service';

interface InputDataModel{
  title: string,
  question: string,
  iconClass?: string,
  type?: string
}

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent {
  title: string;
  question: string;
  iconClass: string | undefined = 'fa-solid fa-user';
  type:string | undefined = 'Confirmation';


  constructor(
    private modalService: ModalService,
    private dialog: DialogRef<OutCustomModal,OutCustomModal>,
    @Inject(DIALOG_DATA) private data: InputDataModel
  ){

    this.title = data.title;
    this.question = data.question;
    this.iconClass = data.iconClass;
    this.type = data.type;

    this.modalService.closeModalEvent.subscribe(() => {
      this.close();
    });
  }

  close(){
    this.dialog.close();
  }
  closeWithResponse(response: boolean){
    this.dialog.close({response});
  }
}
