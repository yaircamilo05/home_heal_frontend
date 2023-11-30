import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { MenuGetModel } from 'src/app/models/menu.model';
import { Roles } from 'src/app/common/rols.const';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { Messages } from 'src/app/common/messages.const';
import { ImagesCarousel } from 'src/app/models/images.carousel';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    constructor(private authService: AuthService,
                private router: Router,
                private modalService: ModalService) {

    }
    location: string = 'ADMINISTRACIÓN';
    user:UserGetWithMenusModel | null = null;
   

    ngOnInit(): void {
      this.getUserLogged();
    }

    getUserLogged(){
      this.authService.user$.subscribe(user =>{
        this.user = user;
      });
    }

    setLocation(menu:MenuGetModel){
      this.location = menu?.title.toUpperCase() || 'ADMINISTRACIÓN';
    }

     async logout(){

      var logouted = await this.modalService.openModalConfirmation(Messages.Logout);
      if(logouted.isConfirmed){
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }

}
