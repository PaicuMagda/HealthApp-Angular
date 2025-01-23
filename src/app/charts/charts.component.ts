import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {
  ChartType,
  GoogleChartComponent,
  GoogleChartsModule,
} from 'angular-google-charts';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Patient } from '../interfaces/patient';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ChartsService } from '../services/charts.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
  specializari: any[] = [];
  doctor: any;
  patients: Patient[] = [];
  dataForCharts: any;
  @ViewChild('chart') chartElement: ElementRef;

  @ViewChild('chart1') chart1: GoogleChartComponent;
  @ViewChild('chart2') chart2: GoogleChartComponent;
  @ViewChild('chart3') chart3: GoogleChartComponent;
  @ViewChild('chart4') chart4: GoogleChartComponent;

  public chartType1: ChartType = ChartType.ColumnChart;
  public chartData1: any[] = [];
  public chartOptions1 = {
    title: 'Numărul de pacienți cu diverse boli',
    is3D: true,
    colors: ['#32CD32'],
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

  public chartType3: ChartType = ChartType.PieChart;
  public chartData3: any[] = [];
  public chartOptions3 = {
    title: 'Pacientii care au consultatii la fiecare specializare',
    is3D: true,
    colors: ['#76A7FA', '#FF8C00', '#32CD32', '#FF0000'],
    legend: { position: 'bottom' },
  };

  public chartType4: ChartType = ChartType.ColumnChart;
  public chartData4: any[] = [];
  public chartOptions4 = {
    title: 'Pacientii care au consultatii la fiecare specializare',
    is3D: true,
    colors: ['#FF8C00'],
    legend: { position: 'bottom' },
  };

  constructor(private chartsService: ChartsService) {}

  exportToPDF(chart: GoogleChartComponent): void {
    if (chart) {
      const chartWrapper = chart.chartWrapper;

      const googleChart = chartWrapper.getChart();

      if (googleChart) {
        const chartElement = googleChart.getContainer() as HTMLElement;

        if (chartElement) {
          html2canvas(chartElement)
            .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              const doc = new jsPDF();
              const imgWidth = 210;
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
              doc.save('chart.pdf');
            })
            .catch((error) => {
              console.error('Error capturing chart: ', error);
            });
        } else {
          console.error('Chart element container is not available.');
        }
      } else {
        console.error('Google chart is not available.');
      }
    }
  }

  ngOnInit() {
    this.chartsService
      .getDataForCharts()
      .subscribe((results: { diagnostice: any[]; specializari: any[] }) => {
        console.log(results);
        this.chartData1 = results.diagnostice.map((item) => [
          item.boala,
          parseInt(item.numar_pacienti, 10),
        ]);

        this.specializari = results.specializari
          .filter((item) => item.pacient_nume)
          .map((item) => [
            item.pacient_nume,
            parseInt(item.numar_specializari, 10),
          ]);

        this.chartData2 = this.chartData1;
        this.chartData3 = this.chartData4 = this.specializari;
      });
  }

  ngAfterViewInit() {
    if (this.chartElement) {
      this.drawChart1();
      this.drawChart2();
      this.drawChart3();
      this.drawChart4();
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

  drawChart3(): void {
    if (this.chartElement && this.specializari.length > 0) {
      const data = google.visualization.arrayToDataTable([
        ['Numar specializari', 'Nume Pacient'],
        ...this.chartData3,
      ]);
      const options = this.chartOptions3;
      const chart = new google.visualization.PieChart(
        this.chartElement.nativeElement
      );
      chart.draw(data, options);
    }
  }

  drawChart4(): void {
    if (this.chartElement && this.chartData4.length > 0) {
      const data = google.visualization.arrayToDataTable([
        ['Numar specializari', 'Nume Pacient'],
        ...this.chartData4,
      ]);
      const options = this.chartOptions4;
      const chart = new google.visualization.ColumnChart(
        this.chartElement.nativeElement
      );
      chart.draw(data, options);
    }
  }
}
