import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
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

  setIdDoctor(user: any): void {
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

  saveSection(section: keyof Secciones, body: any) {
    switch (section) {
      case 's1': return this.pxService.datosGeneralesPost(body);
      case 's2': return this.pxService.deportivoFm(body);
      case 's3': return this.pxService.medidasFm(body);
      case 's4': return this.pxService.antecedentesFm(body);
      case 's5': return this.pxService.antecedentesPatFm(body);
      case 's6': return this.pxService.antecedentesNoPatFm(body);
      case 's7': return this.pxService.mujerFm(body);
      case 's8': return this.pxService.pediatricoFm(body);
      case 's9': return this.pxService.fichamedicaAuxFm(body);
    }
  }

  cleanSessionStorage() {
    Object.keys(this.showSeccion).forEach((key) => {
      sessionStorage.removeItem(key);
    });
    sessionStorage.removeItem('currentSection');
  }

  /**
   * Carga datos de una sección desde sessionStorage, o desde API si no existe
   * @param sectionKey - Clave de la sección (s1, s2, etc.)
   * @param apiCall - Observable de la llamada API como fallback
   * @param initBody - Objeto inicial vacío si no hay datos
   */
  loadSectionData(sectionKey: string, apiCall: Observable<any>, initBody: any): Observable<any> {
    // 1. Intenta cargar de sessionStorage
    const cached = sessionStorage.getItem(sectionKey);

    if (cached) {
      console.log(`✅ Cargando ${sectionKey} desde sessionStorage`);
      try {
        const data = JSON.parse(cached);
        return of(Array.isArray(data) ? data : [data]);
      } catch (e) {
        console.error(`Error al parsear ${sectionKey} de sessionStorage`, e);
      }
    }
    
    // 2. Si no existe en sesión, consulta API
    console.log(`🔄 ${sectionKey} no en sesión, consultando API...`);
    return apiCall;
  }
}
