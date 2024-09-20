import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {
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
        archivo: file
      });
    }
  }
  agregarVisita(){
    this.addVisit = !this.addVisit;
  }
  addVisita() {
    console.log(this.visitaForm.value);
  }
}
