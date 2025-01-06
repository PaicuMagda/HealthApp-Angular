import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpClient) {}

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
