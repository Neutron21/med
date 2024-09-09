import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Secciones } from '../models/secciones';
import { PxService } from './px.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  constructor (
   private pxService: PxService,
   private http: HttpClient,

  ){}

  showSeccion: Secciones = {
    s1: true,
    s2: false,
    s3: false,
    s4: false,
    s5: false,
    s6: false,
    s7: false,
    s8: false, 
    s9: false
  }

  private seccionActiva = new Subject<Secciones>();
  seccionObservable = this.seccionActiva.asObservable();
  
  updateSeccion(newSeccion: Secciones) {
    this.seccionActiva.next(newSeccion);
    this.showSeccion = newSeccion;

  }
  seccionesCompletadas(seccion: string | null) {
    let body = {}
    switch (seccion) {
      case 's1':
       body = JSON.parse(sessionStorage.getItem('s1')+'');
        this.pxService.datosGeneralesPost(body).subscribe((response: any) => {
          console.log("Paciente registrado con éxito, " + response.message);    
        }, (error: any) =>{
          console.log("Error al registrar paciente: " + error.error.error);
        });
        break;
      case 's2':
        this.pxService.deportivoFm('s2');
        break;
      case 's3':
        this.pxService.medidasFm('s3');
        break;
      case 's4':
        this.pxService.antecedentesFm('s4');
        break;
      case 's5':
        this.pxService.antecedentesPatFm('s5');
        break;
      case 's6':
        this.pxService.antecedentesNoPatFm('s6');
        break;
      case 's7':
        this.pxService.mujerFm('s7');
        break;
      case 's8':
        this.pxService.pediatricoFm('s8');
        break;
      case 's9':
        this.pxService.fichamedicaAuxFm('s9');
        break;
     
    }
  };
}