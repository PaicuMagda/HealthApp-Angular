import { BodyLocation } from './BodyLocation';

export interface Consultation {
  data_consultatie: string;
  diagnosis: string;
  medicamentatie?: string;
  nr_consultatie?: string;
  locations: BodyLocation[];
}
