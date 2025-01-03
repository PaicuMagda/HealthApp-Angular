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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  userForm: FormGroup;
  loginForm: FormGroup;
  isSignUp: boolean = true;

  conditions = {
    minLength: false,
    smallLetter: false,
    capitalLetter: false,
    numberOrSymbol: false,
  };

  constructor(
    private router: Router,
    private form: FormBuilder,
    private patientService: PatientsService
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

  submitSignUp() {
    if (this.userForm.valid) {
      console.log('Formular pentru crearea unui cont trimis!');
    }
  }

  submitLogin() {
    if (this.loginForm.valid) {
      console.log('Formular pentru logare trimis!');
    }
  }

  submit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.patientService.register(userData).subscribe(
        (response) => {
          alert('User salvat cu succes!');
          this.userForm.reset();
          this.router.navigate(['/home-page']);
        },
        (error) => {
          console.error(error);
          alert('Eroare la salvarea utilizatorului!');
        }
      );
    } else {
      alert('Completează toate câmpurile!');
    }
  }

  ngOnInit() {}
}
