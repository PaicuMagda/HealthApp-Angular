import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddNewPatientComponent } from '../add-new-patient/add-new-patient.component';
import { SidenavService } from '../services/sidenav.service';
import { DoctorService } from '../services/doctor.service';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  doctor: any;

  constructor(
    private dialog: MatDialog,
    private sidenavService: SidenavService,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  openAddNewPatient() {
    this.dialog.open(AddNewPatientComponent, {
      width: '90%',
      height: '70%',
      data: { mesaj: 'Salut! Acesta este un mesaj de test.' },
    });
  }

  openMyProfileSidenav() {
    this.sidenavService.toggleSidenav(true);
  }

  openLogout() {
    const logoutDialog = this.dialog.open(LogoutDialogComponent, {
      width: '20%',
      height: '18%',
    });

    logoutDialog.afterClosed().subscribe((result) => {
      setTimeout(() => {
        if (result === 'yes') {
          this.router.navigate(['']);
          this.doctorService.logout();
        }
      });
    });
  }

  ngOnInit(): void {
    this.doctorService.doctor$.subscribe((result) => {
      this.doctor = result;
      console.log('Din navbar' + this.doctor);
    });
  }
}
