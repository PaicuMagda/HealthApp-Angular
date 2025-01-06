import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { SidenavService } from '../services/sidenav.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { DoctorService } from '../services/doctor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    MatDividerModule,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    NgFor,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent implements OnInit {
  constructor(
    private sidenavService: SidenavService,
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private toastr: ToastrService
  ) {
    this.doctorForm = this.formBuilder.group({
      cnp: ['', [Validators.required, Validators.minLength(13)]],
      specializare: ['', Validators.required],
      nume: ['', Validators.required],
      prenume: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      parola: ['', [Validators.minLength(8)]],
    });
  }

  doctorForm: FormGroup;
  doctor: any;
  doctorId: string | null;

  specializari = [
    'Cardiologie',
    'Pneumologie',
    'Diabet si Nutritie',
    'Gastroenterologie',
    'Dermato-venerologie',
    'Neurologie',
    'Oftalmologie',
    'O.R.L',
  ];

  selectedSpecializare: string | null = null;

  onSpecializareChange(specializare: string) {
    console.log(`Specializarea selectată: ${specializare}`);
  }

  closeMyProfileSidenav() {
    this.sidenavService.toggleSidenav(false);
  }

  getDoctorData(): void {
    this.doctorService.doctor$.subscribe((data) => {
      this.doctor = data;
      this.doctorForm.patchValue({
        cnp: this.doctor.cnp,
        specializare: this.doctor.specializare,
        nume: this.doctor.nume,
        prenume: this.doctor.prenume,
        username: this.doctor.username,
        email: this.doctor.email,
        parola: '',
      });
    });
  }

  onUpdateDoctor(): void {
    if (this.doctorForm.valid) {
      const doctorData = this.doctorForm.value;
      const payload = { ...doctorData, id: this.doctorId };
      this.doctorService.updateDoctor(payload).subscribe({
        next: (response) => {
          this.doctorService.setLoggedInDoctor(payload);
          this.toastr.success(
            'Datele doctorului au fost actualizate cu succes!'
          );
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.toastr.error('Completează toate câmpurile corect!');
    }
  }

  ngOnInit(): void {
    this.getDoctorData();
    this.doctorId = localStorage.getItem('user_id');
  }
}
