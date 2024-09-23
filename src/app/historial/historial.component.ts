import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PxService } from '../services/px.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  showSpiner: boolean = false;
  today: string;
  visitaForm: FormGroup;
  visitas: any = [];
  addVisit: boolean= false;
  datosHistorial = [
    {
      fecha: '2024-09-01',
      tipo: 'Radiografía',
      archivoUrl: 'https://example.com/radiografia1.pdf',
      archivoNombre: 'radiografia1.pdf',
      notas: 'Fractura leve detectada en el hueso del pie.'
    },
    {
      fecha: '2024-08-15',
      tipo: 'Análisis de sangre',
      archivoUrl: 'https://example.com/analisis-sangre.pdf',
      archivoNombre: 'analisis-sangre.pdf',
      notas: 'Resultados dentro de los rangos normales.'
    },
    {
      fecha: '2024-07-23',
      tipo: 'Resonancia magnética',
      archivoUrl: 'https://example.com/resonancia-magnetica.pdf',
      archivoNombre: 'resonancia-magnetica.pdf',
      notas: 'No se encontraron anomalías significativas.'
    }
  ];
  previewUrl: string | null = null;


  constructor(private pxService: PxService) {
    this.today = this.formatDate();

    this.visitaForm = new FormGroup({
      fecha: new FormControl(this.today,Validators.required),
      tipo: new FormControl(null, Validators.required),
      comentario: new FormControl(null, Validators.required),
      filePx: new FormControl(null)
    });
   }

  ngOnInit(): void {
  }
  formatDate(): string {
    const date =  new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.visitaForm.patchValue({
        filePx: file
      });
    }
  }
  agregarVisita(){
    this.addVisit = !this.addVisit;
  }
  addVisita() {
    console.log(this.visitaForm.value);

    const formData = new FormData();
    const idPx = btoa(sessionStorage.getItem('currentPxId')+''); //base64
    formData.append('fecha', this.visitaForm.get('fecha')?.value);
    formData.append('tipo', this.visitaForm.get('tipo')?.value);
    formData.append('comentario', this.visitaForm.get('comentario')?.value);
    formData.append('directorio', idPx);

    const archivo = this.visitaForm.get('filePx')?.value;
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
  
  
}
