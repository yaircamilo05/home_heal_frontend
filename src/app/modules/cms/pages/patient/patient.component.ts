import { Component } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  title = 'Juan David Zapata López';
  text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.';
  description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.';
  imageUrl = 'C:\\Users\\juanz\\OneDrive\\Escritorio\\General\\hvimage.png'  
  constructor() { }

}
