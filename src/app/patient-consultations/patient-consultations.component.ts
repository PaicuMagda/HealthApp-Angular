import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CloseDialogComponent } from '../confirmation-dialogs/close-dialog/close-dialog.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PatientsService } from '../services/patients.service';
import { CommonModule } from '@angular/common';
import { HoverElementDirective } from '../directives/hover-element.directive';
import { DeleteConfirmationDialogComponent } from '../confirmation-dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { PdfService } from '../services/pdf.service';
import { DiagnosticsService } from '../services/diagnostics.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-patient-consultations',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HoverElementDirective,
    MatSelectModule,
  ],
  templateUrl: './patient-consultations.component.html',
  styleUrl: './patient-consultations.component.scss',
})
export class PatientConsultationsComponent implements OnInit {
  consultatieForm: FormGroup;
  patientCNP: string;
  consultations: any[] = [];
  diagnostics: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<PatientConsultationsComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientService: PatientsService,
    private pdfService: PdfService,
    private diagnosticsService: DiagnosticsService
  ) {
    this.consultatieForm = this.formBuilder.group({
      dataConsultatie: ['', Validators.required],
      diagnostic: ['', [Validators.required]],
      medicamentatie: ['', Validators.required],
    });
  }

  addConsultation(): void {
    const formData = this.consultatieForm.value;
    const payload = {
      cnp: this.patientCNP,
      diagnostic: formData.diagnostic,
      medicamentatie: formData.medicamentatie,
      data_consultatie: formData.dataConsultatie,
    };

    if (this.consultatieForm.valid) {
      this.patientService.addConsultation(payload).subscribe((result) => {
        this.patientService.loadConsultations(this.patientCNP);
        this.consultatieForm.reset();
      });
    } else {
      console.error('Formular invalid');
    }
  }

  openCloseDialog() {
    const closeDialogRef = this.dialog.open(CloseDialogComponent, {
      width: '20%',
      height: '18%',
    });
    closeDialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        if (result === 'yes') {
          this.dialogRef.close();
        }
      }, 500);
    });
  }

  deleteConsultation(patientCNP: string, nr_consultatie: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        if (result === 'yes') {
          this.patientService
            .deleteConsultation(patientCNP, nr_consultatie)
            .subscribe((result) => {
              console.log(result);
            });
        }
      }, 500);
    });
  }

  generatePdf() {
    this.pdfService.generateConsultationsPdf(this.consultations);
  }

  renunta() {
    this.consultatieForm.reset();
  }

  ngOnInit() {
    this.patientCNP = this.data.cnpPatient;
    this.patientService.loadConsultations(this.patientCNP);
    this.patientService.consultations$.subscribe((result) => {
      this.consultations = result;
    });
    this.diagnostics = this.diagnosticsService.getDiagnostics();
  }
}
