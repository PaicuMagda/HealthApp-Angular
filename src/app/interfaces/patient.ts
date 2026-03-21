import { Consultation } from './consultation';

export interface Patient {
  id: number;
  doctorId: number;

  // Personal Info
  firstName: string;
  lastName: string;
  cnp: string;
  birthDate: string;
  age: number;
  gender: string;
  occupation?: string;

  // Contact
  email: string;
  phone: string;

  // Address
  county: string;
  city: string;
  street?: string;
  number?: string;
  block?: string;
  apartment?: string;
  staircase?: string;
  floor?: string;
  postalCode?: string;

  // Medical Info
  weight: number;
  height: number;
  bloodType: string;
  rh: string;

  // Insurance
  insuranceCompany?: string;
  insuranceId?: string;

  // Medical History
  chronicDiseases?: string;
  vaccinations?: string;
  hereditaryDiseases?: string;
  otherDiseases?: string;

  // Lifestyle
  diet?: string;
  physicalActivity?: string;
  smoker: boolean;
  alcoholConsumer: boolean;
  drugConsumer: boolean;

  // Image
  profileImage?: string;

  // Relations
  consultations: Consultation[];
}
