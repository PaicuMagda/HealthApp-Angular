import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://localhost//healthApp-php/doctor';

  private doctorSubject = new BehaviorSubject<any>(null);
  public doctor$ = this.doctorSubject.asObservable();

  private isLoginSubject = new BehaviorSubject<boolean>(false);
  public isLogin$ = this.isLoginSubject.asObservable();

  constructor(private http: HttpClient) {}

  updateDoctor(doctorData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-my-account.php`, doctorData);
  }

  setLoggedInDoctor(doctor: any): void {
    this.doctorSubject.next(doctor);
  }

  setIsLogin(isLogin: boolean) {
    this.isLoginSubject.next(isLogin);
  }

  getDoctorById(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(`${this.apiUrl}/get-doctor-by-id.php`, { params });
  }

  loginDoctor(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify({ username, password });

    return this.http
      .post(`${this.apiUrl}/login.php`, body, {
        headers,
        responseType: 'json',
      })
      .pipe(
        tap((response: any) => {
          if (response && response.success) {
            this.doctorSubject.next(response.user);
          } else {
            this.doctorSubject.next(null);
          }
        })
      );
  }

  logout() {
    localStorage.clear();
  }

  registerDoctor(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register.php`, user);
  }
}
