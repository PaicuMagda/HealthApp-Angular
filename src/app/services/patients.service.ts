import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private apiUrlRegister = 'http://localhost/healthApp-php/register.php';
  private apiUrlAutentificare = 'http://localhost/healthApp-php/login.php';

  constructor(private http: HttpClient) {}

  register(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(this.apiUrlRegister, user);
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify({ username, password });

    // Setează responseType: 'text' pentru a gestiona răspunsurile care nu sunt JSON valid
    return this.http.post(this.apiUrlAutentificare, body, {
      headers,
      responseType: 'text',
    });
  }

  users: any[] = [
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user1.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user2.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user3.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user4.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user5.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user1.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user2.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user3.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user4.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user5.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user1.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user2.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user3.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user4.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user5.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user1.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user2.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user3.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user4.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
    {
      nume: 'Petrescu Iuliana',
      varsta: 27,
      imagine: '../../assets/user5.jpg',
      diagnostic: 'Infarct miocardic',
      data: '30.10.2001',
    },
  ];

  getUsers(): any {
    return this.users;
  }
}
