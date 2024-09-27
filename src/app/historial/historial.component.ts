import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PxService } from '../services/px.service';
import { AuthService } from '../services/auth.service';
import { SharedDataService } from '../services/shared.service';
import { servicios } from '../catalogos/servicios';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Historico } from '../models/historico';
import { Modal } from 'bootstrap';





@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})

export class HistorialComponent implements OnInit {
  servicios = servicios;
  showSpinner: boolean = false;
  spinnerModal: boolean = false;
  today: string;
  visitaForm: FormGroup;
  visitas: any = [];
  addVisit: boolean= false;
  filePx: any;
  selectedFile: any; 
  urlImage: SafeResourceUrl | null = null;
  BaseUrlImage: string = 'https://solu-tec.net/med/historico/';
  showIframe: any = false;
  hasFile : any = false;

  file = {
    isPDF : false,
    nameFile : 'Ningún archivo seleccionado.',
    notas: ""
  }
  
  datosHistorial:Historico []= [
    {
      id_paciente: 3,
      fecha: '2024-09-01',
      tipo: 'Radiografía',
      pathFile: 'https://example.com/radiografia1.pdf',
      notas: 'Fractura leve detectada en el hueso del pie.',
      fileName: 'radiografia1.pdf'
    },
    {
      id_paciente: 3,
      fecha: '2024-08-15',
      tipo: 'Análisis de sangre',
      pathFile: 'https://example.com/analisis-sangre.pdf',
      notas: 'Resultados dentro de los rangos normales.',
      fileName: 'analisis-sangre.pdf'
    },
    {
      id_paciente: 3,
      fecha: '2024-07-23',
      tipo: 'Resonancia magnética',
      pathFile: 'https://example.com/resonancia-magnetica.pdf',
      notas: 'No se encontraron anomalías significativas.',
      fileName: 'resonancia-magnetica.pdf'
    }
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private pxService: PxService,
    private authService: AuthService,
    private sharedDataService: SharedDataService) {
    this.today = this.formatDate();

    this.visitaForm = new FormGroup({
      fecha: new FormControl(this.today, Validators.required),
      tipo: new FormControl(null, Validators.required),
      comentario: new FormControl(null, Validators.required),
    });
    this.sharedDataService.idPacienteObservable.subscribe(id => {
      this.getHistorial();
    });
  }

  ngOnInit(): void {
    this.getHistorial();
  }

  formatDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.filePx = file;
    }
  }

  agregarVisita() {
    this.addVisit = !this.addVisit;
  }

  addVisita() {
    this.spinnerModal = true; // Mostrar el spinner
    const modalElement = document.getElementById('successModal');
    const modal = new Modal(modalElement!);
    modal.show(); // Mostrar el modal de éxito
    const formData = new FormData();
    const idPx = btoa(sessionStorage.getItem('currentPxId') + ''); 
    formData.append('fecha', this.visitaForm.get('fecha')?.value);
    formData.append('tipo', this.visitaForm.get('tipo')?.value);
    formData.append('notas', this.visitaForm.get('comentario')?.value);
    formData.append('directorio', idPx);
    const archivo = this.filePx; 
    if (archivo) {
        formData.append('archivo', archivo);
    }

    this.pxService.subirVisita(formData).subscribe(
        (response) => {
            console.log('Éxito!', response);
            this.visitaForm.reset();
            this.selectedFile = null; 
            const fileInput = document.getElementById('fichero-tarifas') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = ''; 
            }
            this.spinnerModal = false; // Ocultar el spinner
       
        },
        (error) => {
            console.error('Error al subir la visita', error);
            this.spinnerModal = false; // Ocultar el spinner en caso de error
        }
    );
  };


  

  openSuccessModal() {
    const modalElement = document.getElementById('successModal');
    const modal = new Modal(modalElement!);
    modal.show();
  }


  getHistorial() {
    const currentPx = sessionStorage.getItem('currentPxId') + '';
    this.authService.getById('historial', 'id_paciente', currentPx).subscribe(
      (response) => {
        console.log('Historial de visitas:', response);
        this.datosHistorial = response;
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  previsualizarArchivo(visita: Historico) {

    // this.pxService.getArchivo(nombreArchivo);
    // window.open(this.urlImage);
    this.validaVacio(visita.pathFile, visita.fileName);
    this.file.isPDF = visita.fileName.endsWith('.pdf');
    this.file.nameFile = visita.fileName;
    this.file.notas = visita.notas;
    this.urlImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.BaseUrlImage + visita.pathFile);

  }
  validaVacio(path: string, nameFile: String) {
    this.hasFile = !!path && !!nameFile;
    return this.hasFile;
  }
  mapFileName(name: string){
    const value = !!name ? name : 'NA'
    return value;
  }
  
  showModal() {
    const modalElement = document.getElementById('staticBackdrop'); // Obtén el elemento del modal
    if (modalElement) { // Verifica que el elemento no sea null
      const modal = new Modal(modalElement); // Solo inicializa si existe
      modal.show(); // Muestra el modal
    } else {
      console.error('El modal no se encontró. Asegúrate de que el ID sea correcto.');
    }
  }
}
