import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CloseDialogComponent } from '../confirmation-dialogs/close-dialog/close-dialog.component';
import { PatientsService } from '../services/patients.service';
import { Patient } from '../interfaces/patient';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [MatDividerModule, DatePipe, CommonModule, MatButtonToggleModule],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss',
})
export class PatientDetailsComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<PatientDetailsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pacientService: PatientsService
  ) {}

  pacient: Patient;
  pacientId: string = '';
  selectedValue: string = 'Fișa pacientului';

  onToggleChange(event: any): void {
    this.selectedValue = event.value;
    console.log('Valoare selectată:', this.selectedValue);
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
    this.pacientId = this.data.pacientCnp;

    this.pacientService.getPatientData(this.pacientId).subscribe((result) => {
      this.pacient = result;
      console.log(result);
    });
  }
}
