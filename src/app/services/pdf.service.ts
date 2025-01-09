import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  generatePdf(data: any[]) {
    const doc = new jsPDF();

    doc.text('Raport Pacienti', 10, 10);

    autoTable(doc, {
      head: [['ID', 'Nume', 'Prenume', 'Email']],
      body: data.map((patient) => [
        patient.id,
        patient.nume,
        patient.prenume,
        patient.email,
      ]),
    });

    doc.save('RaportPacienti.pdf');
  }
}
