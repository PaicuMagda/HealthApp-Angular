import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PatientsService } from '../services/patients.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(PatientsService);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
