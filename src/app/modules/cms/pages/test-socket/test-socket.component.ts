import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseCustomModel } from './../../../../models/response.custom.model';
import { AzurepsService } from 'src/app/services/azureps.service';

@Component({
  selector: 'app-test-socket',
  templateUrl: './test-socket.component.html',
  styleUrls: ['./test-socket.component.scss']
})
export class TestSocketComponent {
  form: FormGroup = new FormGroup('');

  constructor(
    private formBuilder: FormBuilder,
    public azSocket: AzurepsService
  ) {
    this.builForm()
  }



  builForm() {
    this.form = this.formBuilder.group({
      message: [''],
    })
  }

  addItem() {
    const content:ResponseCustomModel<string> ={
      data: this.form.value.message
    }

    if (content) {
      this.azSocket.sendContent(content);
    }
  }
}


