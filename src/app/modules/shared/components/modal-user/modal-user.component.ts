import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutCustomModal } from 'src/app/models/out.custom.model';
import { RolOutModel } from 'src/app/models/rol.model';
import { UserCreateModel, UserGetModel } from 'src/app/models/user.model';
import { FileService } from 'src/app/services/file.service';
import { ModalService } from 'src/app/services/modal.service';
import { RolService } from 'src/app/services/rol.service';
import { UserService } from 'src/app/services/user.service';
import { FileModel } from './../../../../models/file.model';


interface InputDataModel {
  title: string,
  question: string,
  iconClass?: string,
  pacienteId: number,
  imageUser: string,
  userName: string,
  type?: string,
  isEdit: boolean,
  user: UserGetModel | null
}


@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent {
  title: string;
  question: string;
  pacienteId: number;
  iconClass: string | undefined = 'fa-solid fa-user';
  type: string | undefined = 'Confirmation';
  mensaje: string = "";
  imageUser: string = "";
  userName: string = "";
  roles: RolOutModel[]= [];
  userToUpdate: UserGetModel | null = null;
  isEdit: boolean = false;
  img: File = new File([], '');
  urlImage: string = "";
  isUploaded: boolean = false;
  changeImage: boolean = false;
  form: FormGroup = new FormGroup({});

  constructor
    (
      private modalService: ModalService,
      private dialog: DialogRef<OutCustomModal, OutCustomModal>,
      @Inject(DIALOG_DATA) private data: InputDataModel,
      private userService: UserService,
      private fb: FormBuilder,
      private rolService: RolService,
      private fileService: FileService
    ) {
    this.title = data.title;
    this.question = data.question;
    this.imageUser = data.imageUser;
    this.iconClass = data.iconClass;
    this.userName = data.userName;
    this.type = data.type;
    this.pacienteId = data.pacienteId;
    this.userToUpdate = data.user
    this.isEdit= data.isEdit;

    this.buildForm();
    if (this.isEdit){
      this.isUploaded = true;
      this.form.controls['name'].setValue(this.userToUpdate?.name);
      this.form.controls['lastname'].setValue(this.userToUpdate?.lastname);
      this.form.controls['email'].setValue(this.userToUpdate?.email);
      this.form.controls['rol_id'].setValue(this.userToUpdate?.rol_id);

    }

    this.modalService.closeModalEvent.subscribe(() => {
      this.close();
    });
  }

  ngOnInit(): void {
    this.getAllRoles();
  }
  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol_id: ['', Validators.required],
      image_url: ['']
    })
  };

  close() {
    this.dialog.close();
  }

  CreateUser() {

    if(this.isEdit){
      this.updateUser();
    }else{
      console.log('Crear usuario')
     if (this.form.valid) {
      let data: UserCreateModel = this.form.value
      console.log(data);
      data.image_url= this.urlImage;
      this.userService.createUser(data).subscribe(
        (response) => {
          this.close();
          console.log('Usuario creado correctamente', response.data);
          this.modalService.openModalConfirmationPromise().then((result) => {
            if (result.isConfirmed) {
              this.close();
              window.location.reload();
            }
          }
          );



        },
        (error)=> {
          console.log('Ha ocurrido un error al crear el usuario', error);
        }

      )
    };

    }

  }

  getAllRoles() {
    this.rolService.getRoles().subscribe(
      (response) => {
        // Verifica si obtienes los datos correctamente
        console.log(response);
        if (response && response.data) {
            this.roles = response.data;
        }
      },
      (error) => {
        console.error('Error al obtener los roles:', error);
      }
    );
  }

  updateUser(){
    if(this.userToUpdate && this.form.valid){
      let user: UserCreateModel = this.form.value

      if(this.urlImage==""){
        user.image_url = this.userToUpdate.image_url;
      }else{
        user.image_url = this.urlImage;
      }
      this.userService.updateUser(user, this.userToUpdate.id).subscribe(
        (response) => {
          console.log('Usuario actualizado correctamente', response.data);
          this.modalService.openModalConfirmationPromise().then((result) => {
            if (result.isConfirmed) {
              this.close();
              window.location.reload();
            }
          }
          );
        },
        (error)=> {
          console.log('Ha ocurrido un error al actualizar el usuario', error);
        }

      )
    }
  }

  OnFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.isUploaded = false;
      this.changeImage = true;
      const file = event.target.files[0];
      console.log(file);
      this.img = file;
    }
  }

  UploadImage(){
    if(this.img){
      const formData: FormData = new FormData();
      var imageFile:FileModel = {
        name: this.img.name,
        file: this.img,
        fileName: this.img.name
      };
      this.fileService.upload_file(imageFile).subscribe(
        (response) => {
          this.isUploaded = true;
          this.urlImage = response.data;
          this.modalService.openModalConfirmationAction();
        },
        (error)=> {
          console.log('Ha ocurrido un error al subir la imagen', error);
        }

      )
    }
  }



}
