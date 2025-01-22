import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CloseDialogComponent } from '../confirmation-dialogs/close-dialog/close-dialog.component';
import { PatientsService } from '../services/patients.service';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JudeteService } from '../services/judete.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmAdditionComponent } from '../confirmation-dialogs/confirm-addition/confirm-addition.component';
import { ConsultatiiPacientComponent } from '../consultatii-pacient/consultatii-pacient.component';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    MatDividerModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
    ConsultatiiPacientComponent,
  ],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss',
})
export class PatientDetailsComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<PatientDetailsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pacientService: PatientsService,
    private formBuilder: FormBuilder,
    private judeteService: JudeteService,
    private toastr: ToastrService
  ) {}

  imageProfileFileName: string | undefined;
  imageProfile: string;
  patientForm: FormGroup;
  doctorId: string | null;
  judete: string[] = [];
  orase: string[] = [];
  selectedJudet: string | null = null;
  selectedOras: string | null = null;
  grupe: string[] = ['A', 'B', 'AB', 'O'];
  rh: string[] = ['RH+', 'RH-'];
  pacient: any;
  pacientId: string = '';
  selectedValue: string = 'Fișa pacientului';

  onToggleChange(event: any): void {
    this.selectedValue = event.value;
  }

  exportToPDF(): void {
    const content = document.getElementById('content');

    if (content) {
      console.log('Start capturing content');
      html2canvas(content, {
        scrollX: 0,
        scrollY: -window.scrollY,
        useCORS: true,
        logging: true,
        width: content.scrollWidth,
        height: content.scrollHeight,
      })
        .then((canvas) => {
          console.log('Image captured successfully');
          const imgData = canvas.toDataURL('image/png');

          const doc = new jsPDF();
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

          console.log('Saving PDF');
          doc.save('pacient.pdf');
        })
        .catch((error) => {
          console.error('Error capturing content: ', error);
        });
    } else {
      console.error('Element with ID "content" not found');
    }
  }

  openCloseDialog() {
    const closeDialogRef = this.dialog.open(CloseDialogComponent, {
      width: '20%',
      height: '18%',
    });
    closeDialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        if (result === 'yes') {
          this.dialogRef.close();
        }
      }, 500);
    });
  }

  onFileSelectedImageProfile(event: any) {
    const file: File = event.target.files[0];
    this.imageProfileFileName = file.name;
    const reader = new FileReader();
    this.imageProfileFileName = file.name;
    reader.onload = () => {
      const base64String = reader.result as string;
      this.imageProfile = base64String;
    };
    reader.readAsDataURL(file);
  }

  selectGen(value: string): void {
    this.patientForm.get('gen')?.setValue(value);
    this.patientForm.get('gen')?.markAsTouched();
  }

  addNewPatient(): void {
    const formData = this.patientForm.value;
    const payload = {
      doctor_id: this.doctorId,
      nume: formData.nume,
      prenume: formData.prenume,
      strada: formData.adresa.strada,
      numar: formData.adresa.numar,
      data_nasterii: formData.data_nasterii,
      cnp: formData.cnp,
      gen: formData.gen,
      email: formData.email,
      varsta: formData.varsta,
      greutate: formData.greutate,
      inaltime: formData.inaltime,
      ocupatie: formData.ocupatie,
      poza: this.imageProfile,
      cid: formData.cid,
      casa_de_asigurari: formData.casa_de_asigurari,
      judet: formData.adresa.judet,
      oras: formData.adresa.oras,
      bloc: formData.adresa.bloc,
      apartament: formData.adresa.apartament,
      scara: formData.adresa.scara,
      etaj: formData.adresa.etaj,
      cod_postal: formData.adresa.cod_postal,
      telefon: formData.telefon,
      rh: formData.rh,
      grupa_sanguina: formData.grupa_sanguina,
      boli_cronice: formData.boli_cronice,
      vaccinari: formData.vaccinari,
      boli_ereditare: formData.boli_ereditare,
      boala: formData.boala,
      dieta: formData.stilDeViata.dieta,
      activitate_fizica: formData.stilDeViata.activitateFizica,
      fumat: formData.stilDeViata.fumat,
      consum_alcool: formData.stilDeViata.consumAlcool,
      consum_droguri: formData.stilDeViata.consumDroguri,
    };

    const closeDialogRef = this.dialog.open(ConfirmAdditionComponent, {
      width: '20%',
      height: '18%',
    });
    closeDialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        if (result === 'yes') {
          this.dialogRef.close();
          this.pacientService.addPatient(payload).subscribe((result) => {
            console.log(result);
          });
        }
      }, 500);
    });
  }

  validateCNP(cnp: string): boolean {
    return /^\d{13}$/.test(cnp);
  }

  decodeCNP(cnp: string): {
    dataNasterii: string;
    varsta: number;
    gen: string;
  } {
    const anPrefix: { [key: string]: string } = {
      '1': '19',
      '2': '19',
      '3': '18',
      '4': '18',
      '5': '20',
      '6': '20',
    };

    const gen = cnp[0];

    if (!(gen in anPrefix) && !['7', '8', '9'].includes(gen)) {
      throw new Error('CNP invalid: Prefixul genului nu este valid.');
    }

    const an = +cnp.substring(1, 3);
    const luna = +cnp.substring(3, 5);
    const zi = +cnp.substring(5, 7);

    const prefix = anPrefix[gen] || '19';
    const anComplet = +`${prefix}${an.toString().padStart(2, '0')}`;

    const dataNasterii = new Date(anComplet, luna - 1, zi);

    const today = new Date();
    const age = today.getFullYear() - dataNasterii.getFullYear();
    const isBirthdayPassed =
      today.getMonth() > dataNasterii.getMonth() ||
      (today.getMonth() === dataNasterii.getMonth() &&
        today.getDate() >= dataNasterii.getDate());

    const sex = ['1', '3', '5', '7'].includes(gen) ? 'Masculin' : 'Feminin';

    return {
      dataNasterii: dataNasterii.toISOString().split('T')[0],
      varsta: isBirthdayPassed ? age : age - 1,
      gen: sex,
    };
  }

  onJudetChange(): void {
    const judet = this.patientForm.get('adresa.judet')?.value;
    if (judet) {
      this.judeteService.getOraseByJudet(judet).subscribe(
        (orase) => {
          console.log('Orase primite pentru județul ' + judet, orase);
          this.orase = orase;
          this.patientForm.patchValue({
            'adresa.oras': '',
          });
        },
        (error) => {
          console.error('Eroare la încărcarea orașelor:', error);
        }
      );
    }
  }
  restrictInputToNumbers(event: KeyboardEvent): void {
    const key = event.key;
    if (!/^\d$/.test(key) && key !== 'Backspace' && key !== 'Tab') {
      event.preventDefault();
    }
  }

  saveChanges() {
    if (this.patientForm.valid) {
      const formData = this.patientForm.value;

      // const updatedPatientData = {
      //   doctor_id: this.doctorId,
      //   nume: formData.nume || this.pacient.nume,
      //   prenume: formData.prenume || this.pacient.prenume,
      //   strada: formData.adresa.strada || this.pacient.strada,
      //   numar: formData.adresa.numar || this.pacient.numar,
      //   data_nasterii: formData.dataNasterii || this.pacient.data_nasterii,
      //   cnp: formData.cnp || this.pacient.cnp,
      //   gen: formData.gen || this.pacient.gen,
      //   email: formData.email || this.pacient.email,
      //   varsta: formData.varsta || this.pacient.varsta,

      //   greutate: formData.greutate || this.pacient.greutate,
      //   inaltime: formData.inaltime || this.pacient.inaltime,
      //   ocupatie: formData.ocupatie || this.pacient.ocupatie,
      //   poza: this.imageProfile || this.pacient.poza,
      //   casa_de_asigurari:
      //     formData.casaDeAsigurari || this.pacient.casa_de_asigurari,
      //   judet: formData.adresa.judet || this.pacient.judet,
      //   oras: formData.adresa.oras || this.pacient.oras,
      //   bloc: formData.adresa.bloc || this.pacient.bloc,
      //   apartament: formData.adresa.apartament || this.pacient.apartament,
      //   scara: formData.adresa.scara || this.pacient.scara,

      //   etaj: formData.adresa.etaj || this.pacient.etaj,
      //   cod_postal: formData.adresa.cod_postal || this.pacient.cod_postal,
      //   telefon: formData.telefon || this.pacient.telefon,
      //   rh: formData.rh || this.pacient.rh,
      //   grupa_sanguina: formData.grupa_sanguina || this.pacient.grupa_sanguina,
      //   boli_cronice: formData.boli_cronice || this.pacient.boli_cronice,
      //   vaccinari: formData.vaccinari || this.pacient.vaccinari,
      //   boli_ereditare: formData.boliEreditare || this.pacient.boli_ereditare,
      //   boala: formData.boala || this.pacient.boala,
      //   dieta: formData.stilDeViata.dieta || this.pacient.dieta,

      //   activitate_fizica:
      //     formData.stilDeViata.activitate_fizica ||
      //     this.pacient.activitate_fizica,
      //   fumat: formData.stilDeViata.fumat || this.pacient.fumat,
      //   consum_alcool:
      //     formData.stilDeViata.consumAlcool || this.pacient.consum_alcool,
      //   consum_droguri:
      //     formData.stilDeViata.consumDroguri || this.pacient.consum_droguri,
      // };

      const patientData = {
        id: 1,
        nume: 'Popescu',
        prenume: 'Ion',
        cnp: '2901234567890',
        email: 'ion.popescu@email.com',
        varsta: 45,
        greutate: 80.5,
        inaltime: 1.8,
        ocupatie: 'Inginer',
        telefon: '0712345678',
        rh: 'O-',
        grupa_sanguina: 'O',
        boli_cronice: 'Hipertensiune',
        vaccinari: 'Da',
        boli_ereditare: 'Da',
        boala: 'Diabet',
        dieta: 'Vegetarian',
        activitate_fizica: 'Moderata',
        fumat: 0,
        consum_alcool: 1,
        consum_droguri: 0,
        judet: 'Ilfov',
        oras: 'București',
        strada: 'Strada Exemplu',
        numar: '12',
        bloc: 'A',
        apartament: '34',
        scara: 'B',
        etaj: '3',
        cod_postal: '123456',
      };

      const closeDialogRef = this.dialog.open(ConfirmAdditionComponent, {
        width: '20%',
        height: '20%',
      });
      closeDialogRef.afterClosed().subscribe((result) => {
        setTimeout(() => {
          if (result === 'yes') {
            this.dialogRef.close();
            this.pacientService
              .updatePatient(this.pacient.id, patientData)
              .subscribe(
                (response) => {
                  this.toastr.success('Pacientul a fost actualizat!', 'Succes');
                },
                (error) => {
                  console.error('Eroare la actualizarea pacientului:', error);
                }
              );
          }
        }, 100);
      });
    } else {
      this.toastr.error('Formularul este incomplet sau incorect!', 'Eroare');
    }
  }

  ngOnInit() {
    this.pacientId = this.data.pacientCnp;

    this.patientForm = this.formBuilder.group({
      nume: ['', [Validators.required]],
      prenume: ['', [Validators.required]],
      adresa: this.formBuilder.group({
        judet: ['', [Validators.required]],
        oras: ['', [Validators.required]],
        strada: [''],
        numar: [''],
        bloc: [''],
        apartament: [''],
        scara: [''],
        etaj: [''],
        cod_postal: [''],
      }),
      dataNasterii: [''],
      gen: [''],
      cnp: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{13}$/),
          Validators.pattern(/^\d+$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      varsta: [''],
      greutate: ['', [Validators.required]],
      inaltime: [''],
      ocupatie: [''],
      cid: [''],
      casaDeAsigurari: [''],
      telefon: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      rh: ['', [Validators.required]],
      grupa_sanguina: ['', [Validators.required]],
      boli_cronice: [''],
      vaccinari: [''],
      boliEreditare: [''],
      boala: [''],
      stilDeViata: this.formBuilder.group({
        dieta: [''],
        activitate_fizica: [''],
        fumat: [false],
        consumAlcool: [false],
        consumDroguri: [false],
      }),
    });

    this.doctorId = localStorage.getItem('user_id');

    this.patientForm.markAllAsTouched();
    this.patientForm.get('cnp')?.valueChanges.subscribe((cnp) => {
      if (this.validateCNP(cnp)) {
        const { dataNasterii, varsta, gen } = this.decodeCNP(cnp);
        this.patientForm.patchValue({
          dataNasterii: dataNasterii,
          varsta: varsta,
          gen: gen,
        });
      } else {
        this.patientForm.patchValue({
          dataNasterii: '',
          varsta: '',
          gen: '',
        });
      }
    });

    this.judeteService.getJudețe().subscribe((județe) => {
      this.judete = județe;
    });

    this.pacientService.getPatientData(this.pacientId).subscribe((result) => {
      this.pacient = result;

      if (this.pacient) {
        this.patientForm.patchValue({
          nume: result.patient.nume || '',
          prenume: result.patient.prenume || '',
          cnp: result.patient.cnp || '',
          email: result.patient.email || '',
          varsta: result.patient.varsta || '',
          greutate: result.patient.greutate || '',
          inaltime: result.patient.inaltime || '',
          ocupatie: result.patient.ocupatie || '',
          telefon: result.patient.telefon || '',
          rh: result.patient.rh || '',
          grupa_sanguina: result.patient.grupa_sanguina || '',
          boli_cronice: result.patient.boli_cronice || '',
          vaccinari: result.vaccinari || '',
          boliEreditare: result.patient.boli_ereditare || '',
          boala: result.patient.boala || '',
          stilDeViata: {
            dieta: result.patient.dieta || '',
            activitate_fizica: result.patient.activitate_fizica || '',
            fumat: !!result.patient.fumat,
            consumAlcool: !!result.patient.consum_alcool,
            consumDroguri: !!result.patient.consum_droguri,
          },
          adresa: {
            judet: result.patient?.judet || '',
            oras: result.patient?.oras || '',
            strada: result.patient?.strada || '',
            numar: result.patient?.numar || '',
            bloc: result.patient?.bloc || '',
            apartament: result.patient?.apartament || '',
            scara: result.patient?.scara || '',
            etaj: result.patient?.etaj || '',
            cod_postal: result.patient?.cod_postal || '',
          },
        });
        this.patientForm.markAsPristine();
      }
    });
  }
}
