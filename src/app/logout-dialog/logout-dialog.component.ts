import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from '../services/doctor.service';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss',
})
export class LogoutDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<LogoutDialogComponent>,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  close() {
    this.dialogRef.close();
  }

  logout() {
    this.doctorService.logout();
    this.router.navigate(['']);
    this.dialogRef.close();
  }
}
