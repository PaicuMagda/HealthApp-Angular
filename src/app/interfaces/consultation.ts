import { BodyLocation } from './BodyLocation';

export interface Consultation {
  data_consultatie: string;
  diagnostic: string;
  medicamentatie?: string;
  nr_consultatie?: string;
  locations: BodyLocation[];
}
