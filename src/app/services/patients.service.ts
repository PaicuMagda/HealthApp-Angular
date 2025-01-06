import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpClient) {
    this.loadInitialPatients();
  }

  private patientsSubject = new BehaviorSubject<any[]>([]);
  public patients$ = this.patientsSubject.asObservable();

  private apiUrl = 'http://localhost/healthApp-php';

  loadInitialPatients(): void {
    this.http.get<any[]>(`${this.apiUrl}/get-patients.php`).subscribe(
      (patients) => {
        this.patientsSubject.next(patients);
      },
      (error) => {
        console.error('Eroare la încărcarea pacienților:', error);
      }
    );
  }

  updatePatients(newPatient: any): void {
    const currentPatients = this.patientsSubject.value;
    this.patientsSubject.next([...currentPatients, newPatient]);
  }

  addPatient(newPatient: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/add-patient.php`, newPatient)
      .pipe(
        tap((response) => {
          if (response.success) {
            const currentPatients = this.patientsSubject.value;
            this.patientsSubject.next([...currentPatients, response.patient]); // Actualizează lista locală
          }
        })
      );
  }
}
