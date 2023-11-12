import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-multi',
  templateUrl: './select-multi.component.html',
  styleUrls: ['./select-multi.component.scss'],
})
export class SelectMultiComponent {
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
}
