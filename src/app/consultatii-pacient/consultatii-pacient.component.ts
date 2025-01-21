import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { PatientsService } from '../services/patients.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CloseDialogComponent } from '../confirmation-dialogs/close-dialog/close-dialog.component';
import { PatientConsultationsComponent } from '../patient-consultations/patient-consultations.component';
import { DeleteConfirmationDialogComponent } from '../confirmation-dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { PdfService } from '../services/pdf.service';
import { DiagnosticsService } from '../services/diagnostics.service';

@Component({
  selector: 'app-consultatii-pacient',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './consultatii-pacient.component.html',
  styleUrl: './consultatii-pacient.component.scss',
})
export class ConsultatiiPacientComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pacientService: PatientsService,
    private dialogRef: MatDialogRef<PatientConsultationsComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private patientService: PatientsService,
    private pdfService: PdfService,
    private diagnosticsService: DiagnosticsService
  ) {}

  consultatii: any[] = [];
  consultatieForm: FormGroup;
  diagnostics: any[] = [];
  @Input() patientId!: string;
  isEditing: { [key: number]: boolean } = {};
  editableConsultation: any = {};

  addConsultation(): void {
    const formData = this.consultatieForm.value;
    const payload = {
      cnp: this.patientId,
      diagnostic: formData.diagnostic,
      medicamentatie: formData.medicamentatie,
      data_consultatie: formData.dataConsultatie,
    };

    if (this.consultatieForm.valid) {
      this.pacientService.addConsultation(payload).subscribe((result) => {
        this.pacientService.loadConsultations(this.patientId);
        this.consultatieForm.reset();
      });
    } else {
    }
  }

  getConsultationById(consultationId: number) {
    return this.consultatii.find((c) => c.nr_consultatie === consultationId);
  }

  updateConsultationInList(consultationId: number, updatedData: any) {
    const consultation = this.getConsultationById(consultationId);
    if (consultation) {
      Object.assign(consultation, updatedData);
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
            .subscribe(() => {});
        }
      }, 500);
    });
  }

  generatePdf() {
    this.pdfService.generateConsultationsPdf(this.consultatii);
  }

  renunta() {
    this.consultatieForm.reset();
  }

  saveConsultation(consultationId: number): void {
    this.patientService
      .updateConsultation(consultationId, this.editableConsultation)
      .subscribe(
        () => {
          this.cancelEdit(consultationId);
        },
        (error) => {
          console.error('Eroare la salvarea consultației:', error);
        }
      );
  }

  cancelEdit(consultationId: number): void {
    this.isEditing[consultationId] = false;
    this.editableConsultation = {};
  }

  ngOnInit() {
    this.patientId = this.data.pacientCnp;
    this.consultatieForm = this.formBuilder.group({
      dataConsultatie: [''],
      diagnostic: [''],
      medicamentatie: [''],
    });

    this.pacientService.consultations$.subscribe((result) => {
      this.consultatii = result;
      this.consultatii.forEach((consultation) => {
        this.isEditing[consultation.nr_consultatie] = true;
        this.editableConsultation[consultation.nr_consultatie] = {
          ...consultation,
        };
      });
    });

    this.diagnostics = this.diagnosticsService.getDiagnostics();
    this.patientService.loadConsultations(this.patientId);
  }
}
