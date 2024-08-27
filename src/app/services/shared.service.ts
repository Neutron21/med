import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Secciones } from '../models/secciones';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  destino = ''
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
}