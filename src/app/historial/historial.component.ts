import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PxService } from '../services/px.service';
import { AuthService } from '../services/auth.service';
import { SharedDataService } from '../services/shared.service';
import { servicios } from '../catalogos/servicios';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Historico } from '../models/historico';
declare var bootstrap: any; // Importa bootstrap para manejar el modal




@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})

export class HistorialComponent implements OnInit {

  servicios = servicios;
  showSpiner: boolean = false;
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
  resultText: string = 'Cargando...';
  showError: boolean = false;
  faltanCampos: boolean = false;

  file = {
    isPDF : false,
    nameFile : 'Ningún archivo seleccionado.',
    notas: ""
  }
  
  datosHistorial:Historico []= [];

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
    this.sharedDataService.resetHistorialObs.subscribe(reset => {
      if (reset) { 
        this.reset();
      }
    })
  }

  ngOnInit(): void {
    this.getHistorial();
  }
  reset() {
    this.visitaForm.reset();
    this.selectedFile = null; 
    this.visitaForm.get('fecha')?.setValue(this.formatDate());
    const fileInput = document.getElementById('fichero-tarifas') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = ''; 
    }
    this.faltanCampos = false;
    this.file = {
      isPDF : false,
      nameFile : 'Ningún archivo seleccionado.',
      notas: ""
    }
    this.urlImage = null;
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
    const allowedExtensions = [
      'jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', // Imágenes
      'pdf', 
      'doc', 'docx', // Word
      'ppt', 'pptx', // PowerPoint
      'xls', 'xlsx', // Excel
      'zip' 
    ];
  
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      
      if (allowedExtensions.includes(fileExtension)) { // Archivo permitido
        this.filePx = file;
        console.log('Archivo permitido:', file.name);
      } else { // Archivo no permitido
        console.error('Archivo no permitido. Extensión:', fileExtension);
        alert('Solo se permiten archivos de tipo imagen, PDF, Word, PowerPoint, Excel o ZIP.');
      }
    }
  };
  
  agregarVisita() {
    this.addVisit = !this.addVisit;
  }

  addVisita() {
    
    if (this.visitaForm.valid) {
      this.spinnerModal = true;

      const formData = new FormData();
      const idPx = btoa(sessionStorage.getItem('currentPxId') + '');
      formData.append('fecha', this.visitaForm.get('fecha')?.value);
      formData.append('tipo', this.visitaForm.get('tipo')?.value);
      formData.append('notas', this.visitaForm.get('comentario')?.value);
      formData.append('directorio', idPx);
      const archivo = this.filePx;
    
      formData.append('archivo', archivo);
    
      this.pxService.subirVisita(formData).subscribe(
        (response) => {
          console.log('Éxito!', response);
          this.spinnerModal = false;
          this.reset();
          this.getHistorial();
    
          // Mostrar el modal de éxito al cargar el archivo exitosamente
          const modalElement = document.getElementById('successModal');
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show(); 
          }
        },
        (error) => {
          this.showError = true;
          console.error('Error al registrar visita', error);
          this.resultText = 'Error al registrar visita';
          this.spinnerModal = false;
        }
      );
    } else {
      this.faltanCampos = true;
    }

  };
  
  getHistorial() {
    this.showSpiner = true;
    const currentPx = sessionStorage.getItem('currentPxId') + '';
    this.authService.getById('historial', 'id_paciente', currentPx).subscribe(
      (response) => {
        console.log('Historial de visitas:', response);
        this.datosHistorial = response;
        this.showSpiner = false;
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
        this.showSpiner = false;
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
  closeError() {
    this.showError = false;
  }
  checkFormValid(){
    if (this.faltanCampos) {
      this.faltanCampos = this.visitaForm.valid ? false : true;
    }
  }
  
}
