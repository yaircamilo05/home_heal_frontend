import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cares, CaresCreateModel } from 'src/app/models/cares.model';
import { CaresService } from 'src/app/services/cares.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-cares',
  templateUrl: './cares.component.html',
  styleUrls: ['./cares.component.scss']
})
export class CaresComponent {
  cares: Cares[] = [];
  form: FormGroup = new FormGroup({});
  viewForm:boolean = false;
  @Input() id_patient: number = 0;
  constructor(
    private caresService: CaresService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getCares();  
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
    });
  }



  getCares() {
    this.caresService.getCares(this.id_patient).subscribe(
      (response) => {
        if (response && response.data){
          this.cares = response.data;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  createCare(){
    if(this.form.valid){
      let data: CaresCreateModel = {
        description: this.form.value.description,
        doctor_id: 1, // Buscarlo en el storage service 
        patient_id: this.id_patient
      } 
      this.caresService.createCare(data).subscribe(
        (response) => {
          if (response && response.data){
            this.modalService.openModalConfirmationPromise().then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
        },
        (error: any) => {
          this.modalService.openModalErrorAction("Ha ocurrido un error creando el cuidado")
          console.log(error);
        }
      );
    }

  }

  deleteCare(id:number){
    this.caresService.deleteCare(id).subscribe(
      (response)=>{
        if(response && response.data){
          this.modalService.openModalConfirmationPromise().then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
        }
      },
      (error:any)=>{
        console.error(error)
        this.modalService.openModalErrorAction("Ha ocurrido un error eliminando el cuidado")
      }
    )
  }

  openForm(){
    this.viewForm= true;
  }

}
