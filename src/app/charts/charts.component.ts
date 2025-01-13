import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { GoogleChartsModule } from 'angular-google-charts';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [NavBarComponent, GoogleChartsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent {
  title = 'Angular Google Charts Example';

  // Datele pentru chart
  public chartData = [
    ['Tichet', 'Vânzări'],
    ['Luni', 100],
    ['Marți', 120],
    ['Miercuri', 150],
    ['Joi', 80],
    ['Vineri', 130],
  ];

  // Opțiunile pentru chart
  public chartOptions = {
    title: 'Vânzările pe zile',
    hAxis: { title: 'Ziua' },
    vAxis: { title: 'Vânzări' },
    colors: ['#76A7FA'],
  };

  // Tipul chart-ului
  public chartType = 'ColumnChart';
}
