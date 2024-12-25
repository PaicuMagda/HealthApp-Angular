import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private apiUrl = 'http://localhost:81/proiect-php/index.php';

  constructor(private http: HttpClient) {}

  register(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
