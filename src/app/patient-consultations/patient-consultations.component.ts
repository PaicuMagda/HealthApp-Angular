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

@Component({
  selector: 'app-patient-consultations',
  standalone: true,
  imports: [
    MatDividerModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './patient-consultations.component.html',
  styleUrl: './patient-consultations.component.scss',
})
export class PatientConsultationsComponent implements OnInit {
  consultatieForm: FormGroup;
  consultationsPatient: any;
  patientCNP: string;

  constructor(
    private dialogRef: MatDialogRef<PatientConsultationsComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientService: PatientsService
  ) {
    this.consultatieForm = this.formBuilder.group({
      dataConsultatie: ['', Validators.required],
      diagnostic: ['', [Validators.required, Validators.maxLength(255)]],
      medicamentatie: ['', Validators.required],
    });
  }
  addConsultation(): void {
    const formData = this.consultatieForm.value;
    const payload = {
      cnp: this.patientCNP,
      diagnostic: formData.diagnostic,
      medicamentatie: formData.medicamentatie,
      data_consultatie: formData.data_consultatie,
    };

    if (this.consultatieForm.valid) {
      this.patientService.addConsultation(payload).subscribe((result) => {
        console.log(result);
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

  ngOnInit() {
    this.patientCNP = this.data.cnpPatient;
    console.log(this.patientCNP);
    this.patientService.getPatientData(this.patientCNP).subscribe((results) => {
      console.log(' Aici sunt consultatiile', results);
    });
  }
}
