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

  private apiUrl = 'http://localhost:5003/api';

  loadInitialPatients(): void {
    const doctorId = localStorage.getItem('user_id');

    if (!doctorId) {
      console.error('Doctorul nu este logat!');
      return;
    }
    this.http
      .get<any[]>(`${this.apiUrl}/Patients/${doctorId}/get-patients`)
      .subscribe(
        (patients) => {
          this.patientsSubject.next(patients);
        },
        (error) => {
          console.error('Eroare la încărcarea pacienților:', error);
        },
      );
  }

  updateFilteredPatients(filteredPatients: Patient[]): void {
    this.filteredPatientsSubject.next(filteredPatients);
  }

  getPatientsByDoctor(doctorId: any): void {
    this.http
      .get<any[]>(`${this.apiUrl}/Patients/${doctorId}/get-patients`)
      .subscribe(
        (patients) => {
          this.patientsSubject.next([]);
          this.patientsSubject.next(patients);
        },
        (error) => {
          console.error(
            'Eroare la obținerea pacienților pentru doctor:',
            error,
          );
        },
      );
  }

  getPatientData(cnp: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/Patients/get-patient/${cnp}`);
  }

  updatePatients(newPatient: any): void {
    const currentPatients = this.patientsSubject.value;
    this.patientsSubject.next([...currentPatients, newPatient]);
  }

  deletePatient(patientId: number) {
    const doctorId = localStorage.getItem('user_id');

    return this.http
      .delete(`${this.apiUrl}/Patients/${patientId}?doctorId=${doctorId}`)
      .pipe(
        tap(() => {
          const currentPatients = this.patientsSubject.value;

          const updatedPatients = currentPatients.map((p) =>
            p.id === patientId
              ? {
                  ...p,
                  isActive: false,
                  deletedAt: new Date().toISOString(),
                }
              : p,
          );

          this.patientsSubject.next(updatedPatients);
        }),
      );
  }

  addPatient(newPatient: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/Patients/add-patient`, newPatient)
      .pipe(
        tap((response) => {
          if (response.success) {
            const currentPatients = this.patientsSubject.value;
            this.patientsSubject.next([...currentPatients, response.patient]);
          }
        }),
      );
  }

  addConsultation(newConsultation: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/Consultations`, newConsultation)
      .pipe(
        tap((response) => {
          if (response.success) {
            const currentConsultations = this.consultationsSubject.value;
            this.consultationsSubject.next([
              ...currentConsultations,
              response.consultatie,
            ]);
          }
        }),
      );
  }

  loadConsultations(cnp: string): void {
    this.http.get<any>(`${this.apiUrl}/Consultations/${cnp}`).subscribe(
      (response) => {
        if (response && response.consultations) {
          this.consultationsSubject.next(response.consultations);
        } else {
          console.error(
            'Eroare la obținerea consultațiilor:',
            response.message,
          );
        }
      },
      (error) => {
        console.error('Eroare la obținerea consultațiilor:', error);
      },
    );
  }

  // deleteConsultation(consultationId: number): Observable<any> {
  //   return this.http
  //     .delete<any>(`${this.apiUrl}/Consultations/${consultationId}`)
  //     .pipe(
  //       tap((response) => {
  //         if (response.success) {
  //           const currentConsultations = this.consultationsSubject.value;
  //           const updatedConsultations = currentConsultations.filter(
  //             (c) => c.id !== consultationId,
  //           );
  //           this.consultationsSubject.next(updatedConsultations);
  //         }
  //       }),
  //     );
  // }

  deleteConsultation(consultationId: number): Observable<any> {
    const doctorId = localStorage.getItem('user_id');

    return this.http
      .delete<any>(
        `${this.apiUrl}/Consultations/${consultationId}?doctorId=${doctorId}`,
      )
      .pipe(
        tap((response) => {
          if (response.success) {
            const currentConsultations = this.consultationsSubject.value;

            const updatedConsultations = currentConsultations.map((c) =>
              c.id === consultationId ? { ...c, deletedAt: new Date() } : c,
            );

            this.consultationsSubject.next(updatedConsultations);
          }
        }),
      );
  }

  getConsultationsCountByPatient(): Observable<
    { name: string; count: number }[]
  > {
    return this.http.get<any[]>(`${this.apiUrl}/Consultations`).pipe(
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
      }),
    );
  }

  getConsultationsCountForAllPatients(): Observable<
    { name: string; count: number }[]
  > {
    return this.patients$.pipe(
      map((patients) =>
        patients.map((patient) => ({
          name: `${patient.lastName} ${patient.firstName}`,
          count: patient.consultations.length,
        })),
      ),
    );
  }

  updatePatient(patientId: number, updatedData: any): Observable<any> {
    return this.http
      .put<any>(
        `${this.apiUrl}/Patients/update-patient/${patientId}`,
        updatedData,
      )
      .pipe(
        tap((response) => {
          if (response.success) {
            const currentPatients = this.patientsSubject.value;
            const updatedPatients = currentPatients.map((patient) =>
              patient.id === patientId
                ? { ...patient, ...updatedData }
                : patient,
            );
            this.patientsSubject.next(updatedPatients);
          }
        }),
      );
  }

  updateConsultation(
    consultationId: number,
    updatedData: any,
  ): Observable<any> {
    const doctorId = localStorage.getItem('user_id');

    return this.http
      .put<any>(
        `${this.apiUrl}/Consultations/${consultationId}?doctorId=${doctorId}`,
        {
          consultationId,
          ...updatedData,
        },
      )
      .pipe(
        tap((response) => {
          if (response.success) {
            const currentConsultations = this.consultationsSubject.value;

            const updatedConsultations = currentConsultations.map((c) =>
              c.id === consultationId ? { ...c, ...updatedData } : c,
            );

            this.consultationsSubject.next(updatedConsultations);
          }
        }),
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('user_id');
    return !!token;
  }
}
