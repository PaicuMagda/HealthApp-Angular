import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticsService {
  constructor() {}

  diagnostics = [
    { id: 1, isSelected: false, nume: 'Angină' },
    { id: 2, isSelected: true, nume: 'Aritmie' },
    { id: 3, isSelected: false, nume: 'Cardită' },
    { id: 4, isSelected: true, nume: 'Endocardită' },
    { id: 5, isSelected: false, nume: 'Miocardită' },
    { id: 6, isSelected: true, nume: 'Pericardită' },
    { id: 7, isSelected: false, nume: 'Stenoză' },
    { id: 8, isSelected: true, nume: 'Ischemie' },
    { id: 9, isSelected: false, nume: 'Tahicardie' },
    { id: 10, isSelected: true, nume: 'Bradicardie' },
    { id: 11, isSelected: false, nume: 'Hipertensiune' },
    { id: 12, isSelected: true, nume: 'Insuficiență' },
    { id: 13, isSelected: false, nume: 'Fibrilație' },
    { id: 14, isSelected: true, nume: 'Prolaps' },
    { id: 15, isSelected: false, nume: 'Aneurism' },
  ];

  getDiagnostics() {
    return this.diagnostics;
  }
}
