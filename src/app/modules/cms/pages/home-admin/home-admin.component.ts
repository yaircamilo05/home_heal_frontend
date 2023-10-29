import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { MenuGetModel } from 'src/app/models/menu.model';

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
    constructor(private authService: AuthService) {

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

}
