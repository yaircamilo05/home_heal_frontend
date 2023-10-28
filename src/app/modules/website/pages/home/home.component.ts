import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './../../../../services/auth.service';
import { UserGetWithMenusModel } from 'src/app/models/user.model';
import { MenuGetModel } from 'src/app/models/menu.model';

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
    constructor(private authService: AuthService) {

    }

    ngOnInit(): void {
     this.getUserLogged();
    }

    getUserLogged(){
      this.authService.user$.subscribe(user =>{
        this.user = user;
        console.log('El user', this.user);
      });
    }

    setLocation(menu:MenuGetModel){
      this.location = menu?.title.toUpperCase() || 'WEB SITE';
    }

}
