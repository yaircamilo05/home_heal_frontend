import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$
    .pipe(
      map(user => {
        if(!user && !storageService.getToken()){
          router.navigate(['login']);
          return false;
        }
        return true;
      })
    );
};
