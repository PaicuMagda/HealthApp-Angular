import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { MyAccountComponent } from './my-account/my-account.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PatientsService } from './services/patients.service';
import { NgIf } from '@angular/common';
import { DoctorService } from './services/doctor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyAccountComponent, MatSidenavModule, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  sidenavOpened = false;
  isLogin: boolean;

  constructor(
    private sidenavService: SidenavService,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    this.sidenavService.gettoggleSidenavValue().subscribe((isOpened) => {
      this.sidenavOpened = isOpened;
    });

    this.doctorService.isLogin$.subscribe((result) => {
      this.isLogin = result;
    });
  }
}
