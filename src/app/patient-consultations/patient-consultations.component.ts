import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CloseDialogComponent } from '../confirmation-dialogs/close-dialog/close-dialog.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-patient-consultations',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './patient-consultations.component.html',
  styleUrl: './patient-consultations.component.scss',
})
export class PatientConsultationsComponent {
  constructor(
    private dialogRef: MatDialogRef<PatientConsultationsComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

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
}
