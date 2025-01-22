import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ChartType, GoogleChartsModule } from 'angular-google-charts';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Patient } from '../interfaces/patient';
import { NgClass, NgFor } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PatientsService } from '../services/patients.service';
import { DiagnosticsService } from '../services/diagnostics.service';
import { MatInputModule } from '@angular/material/input';
import { ChartsService } from '../services/charts.service';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    NavBarComponent,
    GoogleChartsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    NgClass,
    MatDatepickerModule,
    MatInputModule,
    NgFor,
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent implements OnInit {
  constructor(
    private patientsService: PatientsService,
    private diagnosticsService: DiagnosticsService,
    private chartsService: ChartsService
  ) {}

  diagnostics: any[];
  doctor: any;
  patients: Patient[] = [];
  dataForCharts: any;

  public chartType: ChartType = ChartType.ColumnChart;
  public chartData: any[] = [];
  public chartOptions = {
    title: 'Numărul de consultații per pacient',
    hAxis: { title: 'Pacienți', textStyle: { fontSize: 10 } },
    vAxis: { title: 'Număr de consultații' },
    legend: { position: 'none' },
    colors: ['#76A7FA'],
  };

  toggleDiagnosticSelection(diagnostic: any): void {
    diagnostic.isSelected = !diagnostic.isSelected;
    const selectedDiagnostics = this.diagnostics
      .filter((diag) => diag.isSelected)
      .map((diag) => diag.nume.toLowerCase());
  }

  ngOnInit() {
    this.diagnostics = this.diagnosticsService.getDiagnostics();
    this.patientsService.patients$.subscribe((result) => {
      this.patients = result;
    });
    this.patientsService
      .getConsultationsCountForAllPatients()
      .subscribe((data) => {
        console.log(data);
        this.chartData = data.map((item) => [item.name, item.count]);
      });
  }
}
