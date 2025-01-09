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

  private consultationsSubject = new BehaviorSubject<any[]>([]);
  public consultations$ = this.consultationsSubject.asObservable();

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

  getPatientData(cnp: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-patient.php?cnp=${cnp}`);
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

  addConsultation(newConsultation: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/add-consultation.php`, newConsultation)
      .pipe(
        tap((response) => {
          if (response.success) {
            const currentConsultations = this.consultationsSubject.value;
            this.consultationsSubject.next([
              ...currentConsultations,
              response.consultatie,
            ]);
          }
        })
      );
  }

  loadConsultations(cnp: string): void {
    this.http
      .get<any>(`${this.apiUrl}/get-consultations.php?cnp=${cnp}`)
      .subscribe(
        (response) => {
          if (response && response.consultatii) {
            this.consultationsSubject.next(response.consultatii);
          } else {
            console.error(
              'Eroare la obținerea consultațiilor:',
              response.message
            );
          }
        },
        (error) => {
          console.error('Eroare la obținerea consultațiilor:', error);
        }
      );
  }

  deleteConsultation(cnp: string, nr_consultatie: number): Observable<any> {
    return this.http
      .request<any>('DELETE', `${this.apiUrl}/delete-consultation.php`, {
        body: { cnp, nr_consultatie },
      })
      .pipe(
        tap((response) => {
          if (response.success) {
            const currentConsultations = this.consultationsSubject.value;
            const updatedConsultations = currentConsultations.filter(
              (c) => c.nr_consultatie !== nr_consultatie
            );
            this.consultationsSubject.next(updatedConsultations);
          }
        })
      );
  }
}
