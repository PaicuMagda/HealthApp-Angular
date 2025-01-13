import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgClass, NgFor } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DiagnosticsService } from '../services/diagnostics.service';
import { HoverElementDirective } from '../directives/hover-element.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PatientsService } from '../services/patients.service';
import { MatDialog } from '@angular/material/dialog';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { PatientConsultationsComponent } from '../patient-consultations/patient-consultations.component';
import { DeleteConfirmationDialogComponent } from '../confirmation-dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DoctorService } from '../services/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../interfaces/patient';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NavBarComponent,
    NgFor,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    NgClass,
    HoverElementDirective,
    MatCheckboxModule,
    FormsModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor(
    private diagnosticsService: DiagnosticsService,
    private patientsService: PatientsService,
    private dialog: MatDialog,
    private doctorService: DoctorService,
    private toastr: ToastrService
  ) {
    this.doctorService.doctor$.subscribe((doctor) => {
      this.patientsService.loadInitialPatients();
    });
  }

  diagnostics: any[];
  doctor: any;
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  searchCriteria: any = {
    name: '',
    phone: '',
    cnp: '',
    gender: '',
    diagnostic: [],
    date: null,
  };

  openDetailsPatient() {
    this.dialog.open(PatientDetailsComponent, {
      width: '90%',
      height: '70%',
      data: {},
    });
  }

  openConsultationsPatient(cnp: string) {
    this.dialog.open(PatientConsultationsComponent, {
      width: '40%',
      height: '100%',
      data: { cnpPatient: cnp },
    });
  }

  deletePatient(patientId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) =>
      setTimeout(() => {
        if (result === 'yes') {
          this.patientsService.deletePatient(patientId).subscribe({
            next: (response) => {
              this.toastr.success('Pacientul a fost șters cu succes!');
            },
          });
        } else {
          this.toastr.error('Pacientul nu se poate șterge!');
        }
      }, 1000)
    );
  }

  toggleDiagnosticSelection(diagnostic: any): void {
    diagnostic.isSelected = !diagnostic.isSelected;
    const selectedDiagnostics = this.diagnostics
      .filter((diag) => diag.isSelected)
      .map((diag) => diag.nume.toLowerCase());
    this.searchCriteria.diagnostic = selectedDiagnostics;
    this.filterPatients();
  }

  onGenderChange(selectedGender: string, event: any): void {
    if (event.checked) {
      this.searchCriteria.gender = selectedGender;
    } else {
      this.searchCriteria.gender = '';
    }
    this.filterPatients();
  }

  getAllPatientForDirector() {
    this.patientsService.loadInitialPatients();
  }

  filterPatients() {
    this.filteredPatients = this.patients.filter((patient) => {
      const nameMatch = this.searchCriteria.name
        ? patient.nume
            .toLowerCase()
            .includes(this.searchCriteria.name.toLowerCase()) ||
          patient.prenume
            .toLowerCase()
            .includes(this.searchCriteria.name.toLowerCase())
        : true;

      const phoneMatch = this.searchCriteria.phone
        ? patient.telefon.includes(this.searchCriteria.phone)
        : true;

      const cnpMatch = this.searchCriteria.cnp
        ? patient.cnp.includes(this.searchCriteria.cnp)
        : true;

      const genderMatch = this.searchCriteria.gender
        ? patient.gen.toLowerCase() === this.searchCriteria.gender.toLowerCase()
        : true;

      const diagnosticMatch = this.searchCriteria.diagnostic.length
        ? this.searchCriteria.diagnostic.some((diag: string) =>
            patient.consultations.some((consultation) =>
              consultation.diagnostic.toLowerCase().includes(diag)
            )
          )
        : true;

      const dateMatch = this.searchCriteria.date
        ? patient.consultations.some(
            (consultation) =>
              consultation.data_consultatie === this.searchCriteria.date
          )
        : true;

      return (
        nameMatch &&
        phoneMatch &&
        cnpMatch &&
        genderMatch &&
        diagnosticMatch &&
        dateMatch
      );
    });
    this.patientsService.updateFilteredPatients(this.filteredPatients);
  }

  ngOnInit(): void {
    this.doctorService.doctor$.subscribe((doctor) => {
      this.doctor = doctor;
      if (doctor.role === 'doctor') {
        this.patientsService.getPatientsByDoctor(doctor.id);
      } else if (doctor.role === 'director') {
        this.patientsService.loadInitialPatients();
      }
    });
    this.patientsService.patients$.subscribe((patients) => {
      this.patients = patients;
      this.filteredPatients = patients;
    });
    this.diagnostics = this.diagnosticsService.getDiagnostics();
  }
}
