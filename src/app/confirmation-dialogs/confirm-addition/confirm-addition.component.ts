import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-confirm-addition',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './confirm-addition.component.html',
  styleUrl: './confirm-addition.component.scss',
})
export class ConfirmAdditionComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmAdditionComponent>) {}

  closeConfirmCloseDialog() {
    this.dialogRef.close('yes');
  }

  takeAddNewPatientDialogOpen() {
    this.dialogRef.close('no');
  }
}
