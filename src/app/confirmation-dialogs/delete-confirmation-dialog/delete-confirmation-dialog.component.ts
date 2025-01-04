import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss',
})
export class DeleteConfirmationDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>
  ) {}
  closeConfirmCloseDialog() {
    this.dialogRef.close('yes');
  }

  takeAddNewPatientDialogOpen() {
    this.dialogRef.close('no');
  }
}
