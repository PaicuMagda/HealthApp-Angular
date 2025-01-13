import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ChartsComponent } from './charts/charts.component';

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
    component: HomePageComponent,
  },
  {
    path: 'charts',
    component: ChartsComponent,
  },
];
