import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgClass, NgFor } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DiagnosticsService } from '../services/diagnostics.service';
import { HoverElementDirective } from '../directives/hover-element.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  constructor(private diagnosticsService: DiagnosticsService) {}

  diagnostics: any[];
  patients: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 111, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  ];

  ngOnInit(): void {
    this.diagnostics = this.diagnosticsService.getDiagnostics();
  }
}
