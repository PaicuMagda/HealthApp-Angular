import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddNewPatientComponent } from '../add-new-patient/add-new-patient.component';
import { SidenavService } from '../services/sidenav.service';
import { DoctorService } from '../services/doctor.service';
import { PdfService } from '../services/pdf.service';
import { PatientsService } from '../services/patients.service';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HoverElementDirective } from '../directives/hover-element.directive';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, NgIf, HoverElementDirective],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  doctor: any;
  patients: any[] = [];
  isLogin: boolean;

  constructor(
    private dialog: MatDialog,
    private sidenavService: SidenavService,
    private doctorService: DoctorService,
    private pdfService: PdfService,
    private patientService: PatientsService,
    private router: Router
  ) {}

  openAddNewPatient() {
    this.dialog.open(AddNewPatientComponent, {
      width: '99%',
      height: '90%',
      data: { mesaj: 'Salut! Acesta este un mesaj de test.' },
    });
  }

  openMyProfileSidenav() {
    this.sidenavService.toggleSidenav(true);
  }

  openLogout() {
    this.dialog.open(LogoutDialogComponent, {
      width: '20%',
      height: '18%',
    });
  }

  generatePdf() {
    this.pdfService.generatePatientsPdf(this.patients);
  }

  goToChartsPage() {
    this.router.navigate(['charts']);
  }

  ngOnInit(): void {
    this.doctorService.doctor$.subscribe((result) => {
      this.doctor = result;
    });
    this.doctorService.isLogin$.subscribe((result) => {
      this.isLogin = result;
    });

    this.patientService.patients$.subscribe((results) => {
      this.patients = results;
    });
  }
}
