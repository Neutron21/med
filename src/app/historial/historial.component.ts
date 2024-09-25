import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PxService } from '../services/px.service';
import { AuthService } from '../services/auth.service';
import { SharedDataService } from '../services/shared.service';
import { servicios } from '../catalogos/servicios';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})

export class HistorialComponent implements OnInit {
  servicios = servicios;
  showSpiner: boolean = false;
  today: string;
  visitaForm: FormGroup;
  visitas: any = [];
  addVisit: boolean= false;
  filePx: any;
  selectedFile: any; // Agregada la propiedad selectedFile
  BaseUrlImage: string = 'https://solu-tec.net/med/historico/';
  urlImage = '';
  datosHistorial = [
    {
      fecha: '2024-09-01',
      tipo: 'Radiografía',
      pathFile: 'https://example.com/radiografia1.pdf',
      archivoNombre: 'radiografia1.pdf',
      notas: 'Fractura leve detectada en el hueso del pie.',
      fileName: 'radiografia1.pdf'
    },
    {
      fecha: '2024-08-15',
      tipo: 'Análisis de sangre',
      pathFile: 'https://example.com/analisis-sangre.pdf',
      archivoNombre: 'analisis-sangre.pdf',
      notas: 'Resultados dentro de los rangos normales.',
      fileName: 'analisis-sangre.pdf'
    },
    {
      fecha: '2024-07-23',
      tipo: 'Resonancia magnética',
      pathFile: 'https://example.com/resonancia-magnetica.pdf',
      archivoNombre: 'resonancia-magnetica.pdf',
      notas: 'No se encontraron anomalías significativas.',
      fileName: 'resonancia-magnetica.pdf'
    }
  ];

  constructor(
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
      this.selectedFile = file.name; // Asigna el nombre del archivo a selectedFile
    }
  }

  agregarVisita() {
    this.addVisit = !this.addVisit;
  }

  addVisita() {
    console.log(this.visitaForm.value);

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
    console.log(formData);
    
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    this.pxService.subirVisita(formData).subscribe(
      (response) => {
        console.log('Éxito!', response);
      },
      (error) => {
        console.error('Error al subir la visita', error);
      }
    );
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

  previsualizarArchivo(nombreArchivo: string) {
    // this.pxService.getArchivo(nombreArchivo);
    this.urlImage = this.BaseUrlImage + nombreArchivo  ;
  }
}
