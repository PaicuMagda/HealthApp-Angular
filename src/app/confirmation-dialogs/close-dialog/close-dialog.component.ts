import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-close-dialog',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './close-dialog.component.html',
  styleUrl: './close-dialog.component.scss',
})
export class CloseDialogComponent {
  constructor(private dialogRef: MatDialogRef<CloseDialogComponent>) {}

  closeConfirmCloseDialog() {
    this.dialogRef.close('yes');
  }

  takeAddNewPatientDialogOpen() {
    this.dialogRef.close('no');
  }
}
