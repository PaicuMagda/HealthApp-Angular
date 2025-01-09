import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpClient) {}

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

  getPatientsByDoctor(doctorId: number): void {
    this.http
      .get<any[]>(
        `${this.apiUrl}/get-patients-by-doctor-id.php?doctor_id=${doctorId}`
      )
      .subscribe(
        (patients) => {
          this.patientsSubject.next(patients);
        },
        (error) => {
          console.error(
            'Eroare la obținerea pacienților pentru doctor:',
            error
          );
        }
      );
  }

  updatePatients(newPatient: any): void {
    const currentPatients = this.patientsSubject.value;
    this.patientsSubject.next([...currentPatients, newPatient]);
  }

  deletePatient(patientId: number) {
    return this.http
      .delete(`${this.apiUrl}/delete-patient.php?id=${patientId}`)
      .pipe(
        tap(() => {
          const updatedPatients = this.patientsSubject.value.filter(
            (patient) => patient.id !== patientId
          );
          this.patientsSubject.next(updatedPatients);
        })
      );
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

  getPatientData(cnp: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-patient.php?cnp=${cnp}`);
  }

  addConsultation(newConsultation: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/add-consultation.php`,
      newConsultation
    );
  }
}
