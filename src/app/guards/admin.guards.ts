import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.getRole() === 'ROLE_RESTAURANT_OWNER') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
