import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-activate-dialog',
  standalone: true,
  imports: [MatDivider],
  templateUrl: './activate-dialog.component.html',
  styleUrl: './activate-dialog.component.scss',
})
export class ActivateDialogComponent {
  constructor(private dialogRef: MatDialogRef<ActivateDialogComponent>) {}

  closeConfirmCloseDialog() {
    this.dialogRef.close('yes');
  }

  takeAddNewPatientDialogOpen() {
    this.dialogRef.close('no');
  }
}
