import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddNewPatientComponent } from '../add-new-patient/add-new-patient.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(private dialog: MatDialog) {}

  openAddNewPatient() {
    this.dialog.open(AddNewPatientComponent, {
      width: '90%',
      height: '70%',
      data: { mesaj: 'Salut! Acesta este un mesaj de test.' },
    });
  }
}
