import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { map } from 'rxjs/operators';

export const chartsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(DoctorService);

  const doctorRole = localStorage.getItem('doctor_role');

  return authService.doctor$.pipe(
    map((result) => {
      if (doctorRole === 'admin') {
        return true;
      } else {
        router.navigate(['']);
        return false;
      }
    })
  );
};
