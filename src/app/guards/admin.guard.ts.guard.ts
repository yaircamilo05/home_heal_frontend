import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as rxjs from 'rxjs';
import { Roles } from '../common/rols.const';

export const AdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.user$
    .pipe(
      rxjs.map(user => {
        if(user?.rol_id != Roles.SUPERADMIN){
          return false;
        }
        return true;
      })
    );
};
