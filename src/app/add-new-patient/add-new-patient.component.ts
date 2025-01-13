import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CloseDialogComponent } from '../confirmation-dialogs/close-dialog/close-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { PatientsService } from '../services/patients.service';
import { ConfirmAdditionComponent } from '../confirmation-dialogs/confirm-addition/confirm-addition.component';

@Component({
  selector: 'app-add-new-patient',
  standalone: true,
  imports: [
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './add-new-patient.component.html',
  styleUrl: './add-new-patient.component.scss',
})
export class AddNewPatientComponent implements OnInit {
  imageProfileFileName: string | undefined;
  imageProfile: string;
  patientForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddNewPatientComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private patientService: PatientsService
  ) {}

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

  selectGen(value: string): void {
    this.patientForm.get('gen')?.setValue(value);
    this.patientForm.get('gen')?.markAsTouched();
  }

  addNewPatient(): void {
    const formData = this.patientForm.value;
    const payload = {
      doctor_id: 1,
      nume: formData.nume,
      prenume: formData.prenume,
      locatie: formData.adresa.locatie,
      strada: formData.adresa.strada,
      numar: formData.adresa.numar,
      data_nasterii: formData.data_nasterii,
      cnp: formData.cnp,
      gen: formData.gen,
      email: formData.email,
      varsta: formData.varsta,
      greutate: formData.greutate,
      inaltime: formData.inaltime,
      ocupatie: formData.ocupația,
      poza: this.imageProfile,
    };

    const closeDialogRef = this.dialog.open(ConfirmAdditionComponent, {
      width: '20%',
      height: '18%',
    });
    closeDialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        if (result === 'yes') {
          this.dialogRef.close();
          this.patientService.addPatient(payload).subscribe((result) => {
            console.log(result);
          });
        }
      }, 500);
    });
  }

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      nume: ['', [Validators.required]],
      prenume: ['', [Validators.required]],
      adresa: this.formBuilder.group({
        locatie: ['', [Validators.required]],
        strada: ['', [Validators.required]],
        numar: ['', [Validators.required]],
      }),
      dataNasterii: ['', [Validators.required]],
      gen: ['', [Validators.required]],
      cnp: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      email: ['', [Validators.required, Validators.email]],
      varsta: ['', [Validators.required, Validators.min(0)]],
      greutate: ['', [Validators.required]],
      înălțime: ['', [Validators.required]],
      ocupația: ['', [Validators.required]],
    });
  }
}
