import { Component, Input, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PatientsService } from '../services/patients.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdf-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-template.component.html',
  styleUrl: './pdf-template.component.scss',
})
export class PdfTemplateComponent implements OnInit {
  @Input() patientCNP: string = '';
  @Input() consultation: any = null;
  patient: any = null;

  constructor(private patientsService: PatientsService) {}

  exportPDF() {
    const data = document.getElementById('content');
    if (data) {
      html2canvas(data).then((canvas) => {
        const imgWidth = 208;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF.jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('exported-file.pdf');
      });
    }
  }

  ngOnInit() {
    if (this.patientCNP) {
      this.patientsService.getPatientData(this.patientCNP).subscribe(
        (response) => {
          this.patient = response.patient;
          console.log('Date pacient:', this.patient);
        },
        (error) => {
          console.error('Eroare la preluarea datelor pacientului:', error);
        }
      );
    } else {
      console.warn('CNP-ul pacientului nu este setat.');
    }
  }
}
