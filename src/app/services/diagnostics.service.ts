import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticsService {
  constructor() {}

  diagnostics = [
    { id: 1, isSelected: false, nume: 'Angină' },
    { id: 2, isSelected: false, nume: 'Aritmie' },
    { id: 3, isSelected: false, nume: 'Cardită' },
    { id: 4, isSelected: false, nume: 'Endocardită' },
    { id: 5, isSelected: false, nume: 'Miocardită' },
    { id: 6, isSelected: false, nume: 'Pericardită' },
    { id: 7, isSelected: false, nume: 'Stenoză' },
    { id: 8, isSelected: false, nume: 'Ischemie' },
    { id: 9, isSelected: false, nume: 'Tahicardie' },
    { id: 10, isSelected: false, nume: 'Bradicardie' },
    { id: 11, isSelected: false, nume: 'Hipertensiune' },
    { id: 12, isSelected: false, nume: 'Insuficiență' },
    { id: 13, isSelected: false, nume: 'Fibrilație' },
    { id: 14, isSelected: false, nume: 'Prolaps' },
    { id: 15, isSelected: false, nume: 'Aneurism' },
  ];

  getDiagnostics() {
    return this.diagnostics;
  }
}
