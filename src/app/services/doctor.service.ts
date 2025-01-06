import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://localhost/healthApp-php';
  private apiUrlRegister = 'http://localhost/healthApp-php/register.php';
  private apiUrlUpdateDoctor =
    'http://localhost/healthApp-php/update-my-account.php';
  private apiUrlGetDoctorById =
    'http://localhost/healthApp-php/get-doctor-by-id.php';

  private doctorSubject = new BehaviorSubject<any>(null);
  public doctor$ = this.doctorSubject.asObservable();

  constructor(private http: HttpClient) {}

  updateDoctor(doctorData: any): Observable<any> {
    return this.http.put(this.apiUrlUpdateDoctor, doctorData);
  }

  setLoggedInDoctor(doctor: any): void {
    this.doctorSubject.next(doctor);
  }

  getDoctorById(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(`${this.apiUrlGetDoctorById}`, { params });
  }

  loginDoctor(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify({ username, password });

    return this.http.post(`${this.apiUrl}/login.php`, body, {
      headers,
      responseType: 'json',
    });
    // .pipe(
    //   tap((response: any) => {
    //     if (response && response.success) {
    //       this.doctorSubject.next(response.user);
    //     } else {
    //       this.doctorSubject.next(null);
    //     }
    //   })
    // );
  }

  logout() {
    localStorage.clear();
  }

  registerDoctor(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(this.apiUrlRegister, user);
  }
}
