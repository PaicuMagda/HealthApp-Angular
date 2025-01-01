import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CloseDialogComponent } from '../confirmation-dialogs/close-dialog/close-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-new-patient',
  standalone: true,
  imports: [
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgIf,
  ],
  templateUrl: './add-new-patient.component.html',
  styleUrl: './add-new-patient.component.scss',
})
export class AddNewPatientComponent {
  constructor(
    private dialogRef: MatDialogRef<AddNewPatientComponent>,
    private dialog: MatDialog
  ) {}

  imageProfileFileName: string | undefined;
  imageProfile: string;

  onFileSelectedImageProfile(event: any) {
    const file: File = event.target.files[0];
    this.imageProfileFileName = file.name;
    const reader = new FileReader();
    this.imageProfileFileName = file.name;
    reader.onload = () => {
      const base64String = reader.result as string;
      this.imageProfile = base64String;
    };
    reader.readAsDataURL(file);
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
}
