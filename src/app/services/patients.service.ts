import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Patient } from '../interfaces/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpClient) {}

  private patientsSubject = new BehaviorSubject<Patient[]>([]);
  public patients$ = this.patientsSubject.asObservable();

  private filteredPatientsSubject = new BehaviorSubject<Patient[]>([]);
  public filteredPatients$ = this.filteredPatientsSubject.asObservable();

  private consultationsSubject = new BehaviorSubject<any[]>([]);
  public consultations$ = this.consultationsSubject.asObservable();

  private apiUrl = 'http://localhost/healthApp-php';

  loadInitialPatients(): void {
    this.http.get<any[]>(`${this.apiUrl}/patients/get-patients.php`).subscribe(
      (patients) => {
        this.patientsSubject.next(patients);
      },
      (error) => {
        console.error('Eroare la încărcarea pacienților:', error);
      }
    );
  }

  updateFilteredPatients(filteredPatients: Patient[]): void {
    this.filteredPatientsSubject.next(filteredPatients);
  }

  getPatientsByDoctor(doctorId: any): void {
    this.http
      .get<any[]>(
        `${this.apiUrl}/patients/get-patients-by-doctor-id.php?doctor_id=${doctorId}`
      )
      .subscribe(
        (patients) => {
          this.patientsSubject.next([]);
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

  getPatientData(cnp: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/patients/get-patient.php?cnp=${cnp}`
    );
  }

  updatePatients(newPatient: any): void {
    const currentPatients = this.patientsSubject.value;
    this.patientsSubject.next([...currentPatients, newPatient]);
  }

  deletePatient(patientId: number) {
    return this.http
      .delete(`${this.apiUrl}/patients/delete-patient.php?id=${patientId}`)
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
      .post<any>(`${this.apiUrl}/patients/add-patient.php`, newPatient)
      .pipe(
        tap((response) => {
          if (response.success) {
            const currentPatients = this.patientsSubject.value;
            this.patientsSubject.next([...currentPatients, response.patient]);
          }
        })
      );
  }

  addConsultation(newConsultation: any): Observable<any> {
    return this.http
      .post<any>(
        `${this.apiUrl}/consultatii/add-consultation.php`,
        newConsultation
      )
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
      .get<any>(`${this.apiUrl}/consultatii/get-consultations.php?cnp=${cnp}`)
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
      .request<any>(
        'DELETE',
        `${this.apiUrl}/consultatii/delete-consultation.php`,
        {
          body: { cnp, nr_consultatie },
        }
      )
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

  getConsultationsCountByPatient(): Observable<
    { name: string; count: number }[]
  > {
    return this.http
      .get<any[]>(`${this.apiUrl}/consultatii/get-all-consultations.php`)
      .pipe(
        map((consultations) => {
          const counts = consultations.reduce((acc, consultation) => {
            const patientName = consultation.patient_name;
            if (!acc[patientName]) {
              acc[patientName] = 0;
            }
            acc[patientName]++;
            return acc;
          }, {});

          return Object.keys(counts).map((name) => ({
            name,
            count: counts[name],
          }));
        })
      );
  }

  getConsultationsCountForAllPatients(): Observable<
    { name: string; count: number }[]
  > {
    return this.patients$.pipe(
      map((patients) =>
        patients.map((patient) => ({
          name: `${patient.nume} ${patient.prenume}`,
          count: patient.consultations.length,
        }))
      )
    );
  }

  updatePatient(patientId: number, updatedData: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/patients/update-patient.php`, {
        id: patientId,
        ...updatedData,
      })
      .pipe(
        tap((response) => {
          console.log(response);
          if (response.success) {
            const currentPatients = this.patientsSubject.value;
            const updatedPatients = currentPatients.map((patient) =>
              patient.id === patientId
                ? { ...patient, ...updatedData }
                : patient
            );
            this.patientsSubject.next(updatedPatients);
          }
        })
      );
  }

  updateConsultation(
    consultationId: number,
    updatedData: any
  ): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/consultatii/update-consultation.php`, {
        consultationId,
        ...updatedData,
      })
      .pipe(
        tap((response) => {
          if (response.success) {
            const currentConsultations = this.consultationsSubject.value;
            const index = currentConsultations.findIndex(
              (c) => c.nr_consultatie === consultationId
            );
            if (index !== -1) {
              currentConsultations[index] = {
                ...currentConsultations[index],
                ...updatedData,
              };
              this.consultationsSubject.next([...currentConsultations]);
            }
          }
        })
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('user_id');
    return !!token;
  }
}
