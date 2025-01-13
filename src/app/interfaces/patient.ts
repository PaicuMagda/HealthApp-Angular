import { Consultation } from './consultation';

export interface Patient {
  cnp: string;
  consultations: Consultation[];
  data_nasterii: string;
  doctor_id: string;
  email: string;
  gen: string;
  greutate: string;
  id: number;
  inaltime: string;
  locatie: string;
  telefon: string;
  nume: string;
  ocupatie: string;
  poza: string;
  prenume: string;
  strada: string;
  varsta: string;
}
