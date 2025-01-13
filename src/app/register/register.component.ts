import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { PatientsService } from '../services/patients.service';
import { NgIf } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgToastModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  userForm: FormGroup;
  loginForm: FormGroup;
  isSignUp: boolean = true;
  patients: any[];

  conditions = {
    minLength: false,
    smallLetter: false,
    capitalLetter: false,
    numberOrSymbol: false,
  };

  constructor(
    private router: Router,
    private form: FormBuilder,
    private doctorService: DoctorService,
    private toastr: ToastrService,
    private patientsService: PatientsService
  ) {
    this.userForm = this.form.group({
      username: [''],
      email: [''],
      password: [''],
    });

    this.userForm.get('password')?.valueChanges.subscribe((password) => {
      this.validatePassword(password);
    });

    this.loginForm = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  validatePassword(password: string): void {
    this.conditions.minLength = password.length >= 8;
    this.conditions.smallLetter = /[a-z]/.test(password);
    this.conditions.capitalLetter = /[A-Z]/.test(password);
    this.conditions.numberOrSymbol = /[\d\W]/.test(password);
  }

  goToHomePage() {
    this.router.navigate(['/home-page']);
  }

  toggleForm() {
    this.isSignUp = !this.isSignUp;
  }

  showToast(message: string, type: 'success' | 'error') {
    if (type === 'success') {
      this.toastr.success(message);
    } else if (type === 'error') {
      this.toastr.error(message);
    }
  }

  submitSignUp() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.doctorService.registerDoctor(userData).subscribe({
        next: (response) => {
          this.showToast('Contul a fost adăugat cu succes!', 'success');
        },
        error: (err) => {
          const errorMessage =
            err.error?.error || 'A apărut o eroare necunoscută.';
          this.showToast(errorMessage, 'error');
        },
      });
    } else {
      alert('Completează toate câmpurile!');
    }
  }

  submitLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.doctorService.loginDoctor(username, password).subscribe({
        next: (response: any) => {
          if (response.success) {
            const doctorId = response.user.id;
            localStorage.setItem('user_id', doctorId);
            this.doctorService.setIsLogin(true);
            this.doctorService.getDoctorById(doctorId).subscribe({
              next: (doctor) => {
                this.doctorService.setLoggedInDoctor(doctor);
                this.showToast(
                  'Logare reușită! Vei fi redirecționat...',
                  'success'
                );
                setTimeout(() => {
                  this.router.navigate(['/home-page']);
                }, 3000);
              },
              error: (err) => {
                console.error('Eroare la obținerea datelor doctorului:', err);
                this.showToast(
                  'Eroare la încărcarea datelor doctorului.',
                  'error'
                );
              },
            });
          } else {
            this.showToast(
              response.message || 'Logare eșuată! Verificați datele!',
              'error'
            );
          }
        },
        error: (err) => {
          console.error('Eroare HTTP:', err);
          this.showToast(
            'Eroare la logare! Verifică conexiunea sau contactează suportul.',
            'error'
          );
        },
      });
    } else {
      this.showToast('Completează toate câmpurile!', 'error');
    }
  }

  ngOnInit() {}
}
