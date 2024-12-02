import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Secciones } from '../models/secciones';
import { PxService } from './px.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  constructor(private pxService: PxService) {}

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
  };
  idPaciente: number | null = null;
  idDoctor: any = {}; 
  verTodo: boolean = false;

  private seccionActiva = new Subject<Secciones>();
  seccionObservable = this.seccionActiva.asObservable();
  
  updateSeccion(newSeccion: Secciones) {
    this.seccionActiva.next(newSeccion);
    this.showSeccion = newSeccion;
  }

  private idPacienteSubject = new Subject<number | null>();
  idPacienteObservable = this.idPacienteSubject.asObservable();
  
  cambiarIdPaciente(id: number | null): void {
    this.idPacienteSubject.next(id);
    this.idPaciente = id;
  }

  private idDoctorSubject = new Subject<any>();
  idDoctorObservable = this.idDoctorSubject.asObservable();

  cambiarIdDoctor(user: any): void {
    this.idDoctorSubject.next(user);
    this.idDoctor = user;
  }
  

  private allSectionsVisible = new Subject<boolean>();
  allSectionsVisibleObs = this.allSectionsVisible.asObservable();
  
  updateAllSeccionsVisible(showSeccion: boolean) {
    this.allSectionsVisible.next(showSeccion);
    this.verTodo = showSeccion;
  }

  // Observable para limpiar el historial
  private resetHistorial = new Subject<boolean>();
  resetHistorialObs = this.resetHistorial.asObservable();
  
  cleanHistorial(showSeccion: boolean) {
    this.resetHistorial.next(showSeccion);
  }

  seccionesCompletadas(seccion: string | null) {
    let body = {};
    switch (seccion) {
      case 's1':
        body = JSON.parse(sessionStorage.getItem('s1') + '');
        if (!!body) {
          this.pxService.datosGeneralesPost(body).subscribe(
            (response: any) => {
              console.log('Paciente registrado con éxito, ' + response.message);
            },
            (error: any) => {
              console.log('Error al registrar paciente: ' + error.error.error);
            }
          );
        }
        break;
      // Continúa el resto de los casos...
    }
  }

  cleanSessionStorage() {
    Object.keys(this.showSeccion).forEach((key) => {
      sessionStorage.removeItem(key);
    });
    sessionStorage.removeItem('currentSection');
  }
}
