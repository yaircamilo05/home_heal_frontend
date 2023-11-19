import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-socket',
  templateUrl: './test-socket.component.html',
  styleUrls: ['./test-socket.component.scss']
})
export class TestSocketComponent {
  form: FormGroup = new FormGroup('');

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.builForm()
  }
  items: string[] = [];
  newItem: string = '';


  builForm() {
    this.form = this.formBuilder.group({
      message: [''],
    })
  }

  addItem() {
    this.newItem = this.form.value.message
    console.log(this.newItem)
    if (this.newItem) {
      this.items.push(this.newItem);
      this.newItem = '';
    }
  }

  
  
}


