import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private http: HttpClient) {}

  private apiUrl =
    'http://localhost//healthApp-php/PATIENTS/data_for_charts.php';

  getDataForCharts(): Observable<any> {
    return this.http.get<any>(
      `http://localhost//healthApp-php/PATIENTS/data_for_charts.php`
    );
  }
}
