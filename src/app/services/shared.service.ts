import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Secciones } from '../models/secciones';
import { PxService } from './px.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  constructor (
   private pxService: PxService,
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
  idPaciente: number|null = null;
  verTodo: boolean = false;
  // cleanHistorial: boolean = false;

  private seccionActiva = new Subject<Secciones>();
  seccionObservable = this.seccionActiva.asObservable();
  
  updateSeccion(newSeccion: Secciones) {
    this.seccionActiva.next(newSeccion);
    this.showSeccion = newSeccion;
  }
  private idPacienteSubject = new Subject<number|null>();
  idPacienteObservable = this.idPacienteSubject.asObservable();
  
  cambiarIdPaciente(id: number|null) {
    this.idPacienteSubject.next(id);
    this.idPaciente = id;
  }
  private allSectionsVisible = new Subject<boolean>();
  allSectionsVisibleObs = this.allSectionsVisible.asObservable();
  
  updateAllSeccionsVisible(showSeccion: boolean) {
    this.allSectionsVisible.next(showSeccion);
    this.verTodo = showSeccion;
  }
  //Observable para limpiar el historial
  private resetHistorial = new Subject<boolean>();
  resetHistorialObs = this.resetHistorial.asObservable();
  
  cleanHistorial(showSeccion: boolean) {
    this.resetHistorial.next(showSeccion);
    // this.cleanHistorial = showSeccion;
  }
  seccionesCompletadas(seccion: string | null) {
    let body = {}
    switch (seccion) {
      case 's1':
       body = JSON.parse(sessionStorage.getItem('s1')+'');
       if (!!body) {
        this.pxService.datosGeneralesPost(body).subscribe((response: any) => {
          console.log("Paciente registrado con éxito, " + response.message);    
        }, (error: any) =>{
          console.log("Error al registrar paciente: " + error.error.error);
        });
      }
        break;
      case 's2':
        body = JSON.parse(sessionStorage.getItem('s2')+'');
        if (!!body) {
        this.pxService.deportivoFm(body).subscribe((response: any) => {
          console.log("Paciente registrado con éxito, " + response.message);    
        }, (error: any) =>{
          console.log("Error al registrar paciente: " + error.error.error);
        });
      }
        break;
      case 's3':
        body = JSON.parse(sessionStorage.getItem('s3')+'');
        if (!!body) {
        this.pxService.medidasFm(body).subscribe((response: any) => {
          console.log("Paciente registrado con éxito, " + response.message);    
        }, (error: any) =>{
          console.log("Error al registrar paciente: " + error.error.error);
        });
      }
        break;
      case 's4':
        body = JSON.parse(sessionStorage.getItem('s4')+'');
        if (!!body) {
        this.pxService.antecedentesFm(body).subscribe((response: any) => {
          console.log("Paciente registrado con éxito, " + response.message);    
        }, (error: any) =>{
          console.log("Error al registrar paciente: " + error.error.error);
        });
      }
        break;
      case 's5':
        body = JSON.parse(sessionStorage.getItem('s5')+'');
        if (!!body) {
          this.pxService.antecedentesPatFm(body).subscribe((response: any) => {
            console.log("Paciente registrado con éxito, " + response.message);    
          }, (error: any) =>{
            console.log("Error al registrar paciente: " + error.error.error);
          });
        }
        break;
      case 's6':
        body = JSON.parse(sessionStorage.getItem('s6')+'');
        if (!!body) {
        this.pxService.antecedentesNoPatFm(body).subscribe((response: any) => {
          console.log("Paciente registrado con éxito, " + response.message);    
        }, (error: any) =>{
          console.log("Error al registrar paciente: " + error.error.error);
        });
      }
        break;
      case 's7':
        body = JSON.parse(sessionStorage.getItem('s7')+'');
        if (!!body) {
        this.pxService.mujerFm(body).subscribe((response: any) => {
          console.log("Paciente registrado con éxito, " + response.message);    
        }, (error: any) =>{
          console.log("Error al registrar paciente: " + error.error.error);
        });
      }
        break;
      case 's8':
        body = JSON.parse(sessionStorage.getItem('s8')+'');
        if (!!body) {
        this.pxService.pediatricoFm(body).subscribe((response: any) => {
          console.log("Paciente registrado con éxito, " + response.message);    
        }, (error: any) =>{
          console.log("Error al registrar paciente: " + error.error.error);
        });   
      }     
        break;
      case 's9':
        body = JSON.parse(sessionStorage.getItem('s9')+'');
        if (!!body) {
        this.pxService.fichamedicaAuxFm(body).subscribe((response: any) => {
          console.log("Paciente registrado con éxito, " + response.message);    
        }, (error: any) =>{
          console.log("Error al registrar paciente: " + error.error.error);
        });  
      }     
         break;
    }
  };
  cleanSessionStorage(){
    Object.keys(this.showSeccion).forEach(key => {
      sessionStorage.removeItem(key);
    });
    sessionStorage.removeItem('currentSection');
  }
}