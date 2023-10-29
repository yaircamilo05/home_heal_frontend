import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './../../../../services/auth.service';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { MenuGetModel } from 'src/app/models/menu.model';
import { Dialog } from '@angular/cdk/dialog';
import { ModalService } from 'src/app/services/modal.service';
import { CustomModalComponent } from 'src/app/modules/shared/components/custom.modal/custom.modal.component';
import { TitlesModal } from 'src/app/common/titles.modal';
import { IconsModal } from 'src/app/common/icon.modal';
import { TypeModal } from 'src/app/common/type.modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  location: string = 'BIENVENIDO';
  user:UserGetWithMenusModel | null = null;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    constructor(
      private authService: AuthService,
      private dialog: Dialog,
      private modalSevice: ModalService
      ) {

    }

    ngOnInit(): void {
     this.getUserLogged();
    }

    getUserLogged(){
      this.authService.user$.subscribe(user =>{
        this.user = user;
      });
    }

    setLocation(menu:MenuGetModel){
      this.location = menu?.title.toUpperCase() || 'WEB SITE';
    }

    testModalConfirmation(){
     //this.modalSevice.showConfirmation('¿Esta es una prueba del modal de confirmación?', this.dialog);
     return this.dialog.open(CustomModalComponent, {
      minWidth: '800px',
      minHeight: '400px',
      data: {
        title: TitlesModal.Succeed,
        question: "cscsdc",
        iconClass: IconsModal.Succeed,
        type:TypeModal.Succeed
      }
    })
  }
    

    testModalAlert(){
      this.modalSevice.showConfirmation('!Ojo! !Esta es una prueba del modal de aletar!', this.dialog);
    }

}
