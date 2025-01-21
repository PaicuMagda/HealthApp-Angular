import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ChartsComponent } from './charts/charts.component';
import { authGuard } from './guards/auth.guard';
import { chartsGuard } from './guards/charts.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: '',
    component: RegisterComponent,
  },
  {
    path: 'home-page',
    canActivate: [authGuard],
    component: HomePageComponent,
  },
  {
    path: 'charts',
    canActivate: [chartsGuard],
    component: ChartsComponent,
  },
];
