import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CloseDialogComponent } from '../confirmation-dialogs/close-dialog/close-dialog.component';

@Component({
  selector: 'app-add-new-patient',
  standalone: true,
  imports: [],
  templateUrl: './add-new-patient.component.html',
  styleUrl: './add-new-patient.component.scss',
})
export class AddNewPatientComponent {
  constructor(
    private dialogRef: MatDialogRef<CloseDialogComponent>,
    private dialog: MatDialog
  ) {}

  openCloseDialog() {
    this.dialog.open(CloseDialogComponent, {
      width: '20%',
      height: '18%',
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
