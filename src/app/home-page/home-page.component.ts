import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgClass, NgFor } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DiagnosticsService } from '../services/diagnostics.service';
import { HoverElementDirective } from '../directives/hover-element.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PatientsService } from '../services/patients.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NavBarComponent,
    NgFor,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    NgClass,
    HoverElementDirective,
    MatCheckboxModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor(
    private diagnosticsService: DiagnosticsService,
    private patientsService: PatientsService
  ) {}

  diagnostics: any[];
  patients: any[];

  ngOnInit(): void {
    this.diagnostics = this.diagnosticsService.getDiagnostics();
    this.patients = this.patientsService.getUsers();
  }
}
