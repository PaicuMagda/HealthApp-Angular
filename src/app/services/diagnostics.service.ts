import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticsService {
  constructor() {}

  diagnostics = [
    { id: 1, isSelected: false, nume: 'Acnee' },
    { id: 2, isSelected: false, nume: 'Dermatită atopică' },
    { id: 3, isSelected: false, nume: 'Psoriazis' },
    { id: 4, isSelected: false, nume: 'Eczemă' },
    { id: 5, isSelected: false, nume: 'Rozacee' },
    { id: 6, isSelected: false, nume: 'Urticarie' },
    { id: 7, isSelected: false, nume: 'Melanom' },
    { id: 8, isSelected: false, nume: 'Carcinom bazocelular' },
    { id: 9, isSelected: false, nume: 'Carcinom spinocelular' },
    { id: 10, isSelected: false, nume: 'Herpes simplex' },
    { id: 11, isSelected: false, nume: 'Zona zoster' },
    { id: 12, isSelected: false, nume: 'Negi (veruci)' },
    { id: 13, isSelected: false, nume: 'Micoză cutanată' },
    { id: 14, isSelected: false, nume: 'Vitiligo' },
    { id: 15, isSelected: false, nume: 'Alopecie' },
  ];

  getDiagnostics() {
    return this.diagnostics;
  }
}
