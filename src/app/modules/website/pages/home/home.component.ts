import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './../../../../services/auth.service';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { MenuGetModel } from 'src/app/models/menu.model';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { TitlesModal } from 'src/app/common/titles.modal';
import { Icons} from 'src/app/common/icon.modal';
import { TypeModal } from 'src/app/common/type.modal';
import { ModalChatComponent } from 'src/app/modules/shared/components/modal-chat/modal-chat.component';
import { Roles } from 'src/app/common/rols.const';

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
      private dialog: Dialog
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

    testChatModal(){
      let RefDialog = this.dialog.open(ModalChatComponent, {
        minWidth: '800px',
        minHeight: '80%',
        maxWidth: '50%',
        data: {
          title: TitlesModal.Chat,
          question: "",
          iconClass: Icons.Chat,
          type: TypeModal.Chat,
          imageUser: "https://estremorstorageaccount.blob.core.windows.net/estremoruserscontainer/kanigarcia.jpeg",
          userName: "Yuliana Blanco Martinez"
        }
    });
  }

}
