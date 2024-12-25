import { Component, NgModule } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { PatientsService } from '../services/patients.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  userForm: FormGroup;

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
  }

  goToHomePage() {
    this.router.navigate(['/home-page']);
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
