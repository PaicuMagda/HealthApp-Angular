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
        patient.firstName,
        patient.lastName,
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
        consultatie.consultationNumber,
        consultatie.consultationDate,
        consultatie.diagnosis,
        consultatie.medication,
      ]),
    });

    doc.save('RaportConsultatie.pdf');
  }
}
