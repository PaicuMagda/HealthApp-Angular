import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  generatePatientsPdf(data: any[]) {
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

  generateConsultationsPdf(data: any[]) {
    const doc = new jsPDF();

    doc.text('Raport Consultatii', 10, 10);

    autoTable(doc, {
      head: [['CNP', 'Nr.', 'Data', 'Diagnostic', 'Medicamentatie']],
      body: data.map((consultatie) => [
        consultatie.cnp,
        consultatie.nr_consultatie,
        consultatie.data_consultatie,
        consultatie.diagnostic,
        consultatie.medicamentatie,
      ]),
    });

    doc.save('RaportConsultatie.pdf');
  }
}
