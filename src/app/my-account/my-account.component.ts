import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { SidenavService } from '../services/sidenav.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';

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
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent implements OnInit {
  constructor(private sidenavService: SidenavService) {}

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

  ngOnInit(): void {}
}
