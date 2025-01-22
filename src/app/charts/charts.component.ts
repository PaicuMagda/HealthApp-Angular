import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ChartType, GoogleChartsModule } from 'angular-google-charts';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Patient } from '../interfaces/patient';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PatientsService } from '../services/patients.service';
import { DiagnosticsService } from '../services/diagnostics.service';
import { MatInputModule } from '@angular/material/input';
import { ChartsService } from '../services/charts.service';
declare var google: any;

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    NavBarComponent,
    GoogleChartsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, AfterViewInit {
  diagnostics: any[] = [];
  doctor: any;
  patients: Patient[] = [];
  dataForCharts: any;
  @ViewChild('chart') chartElement: ElementRef;

  public chartType1: ChartType = ChartType.ColumnChart;
  public chartData1: any[] = [];
  public chartOptions1 = {
    title: 'Numărul de pacienți cu diverse boli',
    is3D: true,
    colors: ['#76A7FA', '#FF8C00', '#32CD32', '#FF0000'],
    legend: { position: 'bottom' },
  };

  public chartType2: ChartType = ChartType.PieChart;
  public chartData2: any[] = [];
  public chartOptions2 = {
    title: 'Numărul de pacienți cu diverse boli',
    is3D: true,
    colors: ['#76A7FA', '#FF8C00', '#32CD32', '#FF0000'],
    legend: { position: 'bottom' },
  };

  constructor(
    private patientsService: PatientsService,
    private diagnosticsService: DiagnosticsService,
    private chartsService: ChartsService
  ) {}

  ngOnInit() {
    this.chartsService
      .getDataForCharts()
      .subscribe((results: { diagnostice: any[] }) => {
        console.log('Diagnostice:', results);

        this.chartData1 = results.diagnostice.map((item) => [
          item.boala,
          parseInt(item.numar_pacienti, 10),
        ]);
        this.chartData2 = this.chartData1;
      });
  }

  ngAfterViewInit() {
    if (this.chartElement) {
      this.drawChart1();
      this.drawChart2();
    }
  }

  drawChart1(): void {
    if (this.chartElement && this.chartData1.length > 0) {
      const data = google.visualization.arrayToDataTable([
        ['Diagnostic', 'Număr pacienți'],
        ...this.chartData1,
      ]);
      const options = this.chartOptions1;
      const chart = new google.visualization.ColumnChart(
        this.chartElement.nativeElement
      );
      chart.draw(data, options);
    }
  }

  drawChart2(): void {
    if (this.chartElement && this.chartData2.length > 0) {
      const data = google.visualization.arrayToDataTable([
        ['Diagnostic', 'Număr pacienți'],
        ...this.chartData2,
      ]);
      const options = this.chartOptions2;
      const chart = new google.visualization.PieChart(
        this.chartElement.nativeElement
      );
      chart.draw(data, options);
    }
  }
}
