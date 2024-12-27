import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CloseDialogComponent } from '../confirmation-dialogs/close-dialog/close-dialog.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-add-new-patient',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './add-new-patient.component.html',
  styleUrl: './add-new-patient.component.scss',
})
export class AddNewPatientComponent {
  constructor(
    private dialogRef: MatDialogRef<AddNewPatientComponent>,
    private dialog: MatDialog
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
