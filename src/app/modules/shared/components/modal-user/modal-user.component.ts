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
  roles: RolOutModel[] = [];
  userToUpdate: UserGetModel | null = null;
  isEdit: boolean = false;
  img: File | null = null;
  urlImage: string = "";
  isUploaded: boolean = false;
  changeImage: boolean = false;
  form: FormGroup = new FormGroup({});
  image_url_not_upload: string = '';
  selected_file: boolean = false;
  isDoctor: boolean = false;

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
    this.isEdit = data.isEdit;

    this.buildForm();
    if (this.isEdit) {
      this.isUploaded = true;
      this.isDoctor = this.userToUpdate?.rol.id == 4 ? true : false;
      this.form.controls['name'].setValue(this.userToUpdate?.name);
      this.form.controls['lastname'].setValue(this.userToUpdate?.lastname);
      this.form.controls['email'].setValue(this.userToUpdate?.email);
      this.form.controls['rol_id'].setValue(this.userToUpdate?.rol.id);
      this.form.controls['cc'].setValue(this.userToUpdate?.cc);
      this.form.controls['phone'].setValue(this.userToUpdate?.phone);
      this.form.controls['specialty'].setValue(this.userToUpdate?.specialty);
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
      cc: ['', Validators.required],
      phone: ['', Validators.required],
      specialty: [''],
    })
  };

  close() {
    this.dialog.close();
  }

  CreateUser() {

    if (this.isEdit) {
      this.updateUser();
    } else {
      console.log('Crear usuario')
      if (this.form.valid) {

        if (this.selected_file) {

          let imageFile: FileModel = {
            name: 'file',
            file: this.img as File,
            fileName: this.img?.name as string
          };
    
          this.fileService.upload_file(imageFile).subscribe(
            (response) => {
              this.isUploaded = true;
              this.urlImage = response;          
              console.log(`Imagen subida correctamente: ${this.urlImage}`);
              this.send_request();
            },

            (error) => {
              console.log('Ha ocurrido un error al subir la imagen', error);
            }
    
          )
        } else {
          this.send_request();
        }

        
      };

    }

  }

  send_request() {
    let data: UserCreateModel = {
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      email: this.form.value.email,
      password: this.form.value.password,
      rol_id: this.form.value.rol_id,
      image_url: this.urlImage,
      cc: this.form.value.cc,
      phone: this.form.value.phone,
      specialty: this.form.value.specialty,
    }

    console.log(data);

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
      (error) => {
        console.log('Ha ocurrido un error al crear el usuario', error);
      }

    )
  }

  getAllRoles() {
    this.rolService.getRoles().subscribe(
      (response) => {
        // Verifica si obtienes los datos correctamente
        console.log(response.data);
        if (response && response.data) {
          this.roles = response.data.filter((rol) => rol.id == 1 || rol.id == 4);
        }
      },
      (error) => {
        console.error('Error al obtener los roles:', error);
      }
    );
  }

  updateUser(){

    if (this.userToUpdate && this.form.valid) {

      if (this.selected_file) {

        let imageFile: FileModel = {
          name: 'file',
          file: this.img as File,
          fileName: this.img?.name as string
        };
  
        this.fileService.upload_file(imageFile).subscribe(
          (response) => {
            this.isUploaded = true;
            this.urlImage = response;          
            console.log(`Imagen subida correctamente: ${this.urlImage}`);
            this.send_request_update();
          },

          (error) => {
            console.log('Ha ocurrido un error al subir la imagen', error);
          }
  
        )
      } else {
        this.send_request_update();
      }

      
    };
  }
  send_request_update(){
    let data: UserCreateModel = {
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      email: this.form.value.email,
      password: this.form.value.password,
      rol_id: this.form.value.rol_id,
      image_url: this.urlImage,
      cc: this.form.value.cc,
      phone: this.form.value.phone,
      specialty: this.form.value.specialty,
    }

    console.log(data);

    this.userService.updateUser(data, this.userToUpdate?.id as number).subscribe(
      (response) => {
        this.close();
        console.log('Usuario actualizado correctamente', response.data);
        this.modalService.openModalConfirmationPromise().then((result) => {
          if (result.isConfirmed) {
            this.close();
            window.location.reload();
          }
        }
        );
      },
      (error) => {
        console.log('Ha ocurrido un error al actualizar el usuario', error);
      }

    )
  }
 /*  updateUser() {
    if (this.userToUpdate && this.form.valid) {
      let user: UserCreateModel = this.form.value
      console.log(user);
      if (this.urlImage == "") {
        user.image_url = this.userToUpdate.image_url;
      } else {
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
        (error) => {
          console.log('Ha ocurrido un error al actualizar el usuario', error);
        }

      )
    }
  } */

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.img = event.target.files[0];
      console.log(this.img);
      this.selected_file = true;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image_url_not_upload = e.target.result;        
      };
      reader.readAsDataURL(this.img as File);
    }
  }

  onRoleSelected(event: any) {
    if(event.target.value == 4){
      this.isDoctor = true;
    }
    else{
      this.isDoctor = false;
    }
  }
}
