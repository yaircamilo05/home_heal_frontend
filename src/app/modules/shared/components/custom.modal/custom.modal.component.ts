import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { OutCustomModal } from 'src/app/models/out.custom.model';
interface InputData{
  title: string,
  question: string,
  iconClass?: string,
  type?: string
}

@Component({
  selector: 'app-custom.modal',
  templateUrl: './custom.modal.component.html',
  styleUrls: ['./custom.modal.component.scss']
})
export class CustomModalComponent {
  title: string;
  question: string;
  iconClass: string | undefined = 'fa-solid fa-user';
  type:string | undefined = 'Confirmation';
  constructor(
    private dialog: DialogRef<OutCustomModal,OutCustomModal>,
    @Inject(DIALOG_DATA) private data: InputData
    ){
      this.title = data.title;
      this.question = data.question;
      this.iconClass = data.iconClass;
      this.type = data.type;
  }
  close(){
    this.dialog.close();
  }

  closeWithResponse(response: boolean){
    this.dialog.close({response});
  }
}
