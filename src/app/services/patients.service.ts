import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private apiUrl = 'http://localhost/healthApp-php/connection.php';

  constructor(private http: HttpClient) {}

  register(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
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
